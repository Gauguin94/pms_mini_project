package com.pms.backend.service;

import com.pms.backend.domain.Spectrum;
import com.pms.backend.dto.SpectrumDto;
import com.pms.backend.repository.SpectrumRepository;
import com.pms.backend.util.ArrayDecoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class SpectrumService {

    private final SpectrumRepository repo;

    // ★ DB에 저장된 ts가 어떤 시간대로 해석돼야 하는지 지정 (필요시 바꿔)
    private static final ZoneId DB_ZONE = ZoneId.of("Asia/Seoul");

    public SpectrumService(SpectrumRepository repo) { this.repo = repo; }

    /** 드롭다운용: 기본 로컬(저장값 그대로), 필요 시 UTC(Z)로 변환해 반환 */
    public List<String> getRecentTimestamps(int channelId, int limit, boolean asUtc) {
        return repo.findRecentTimestampsByChannel(channelId, limit).stream()
                .map(o -> {
                    LocalDateTime ldt = (o instanceof Timestamp t) ? t.toLocalDateTime()
                            : (o instanceof LocalDateTime l) ? l
                            : LocalDateTime.parse(o.toString().substring(0, 19), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                    return asUtc
                            ? ldt.atZone(DB_ZONE).toInstant().toString()      // → "…Z"
                            : ldt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME); // → "YYYY-MM-DDTHH:MM:SS"
                })
                .toList();
    }

    /** ts 파싱: Z/오프셋이 오면 DB 시간대로 변환, 없으면 로컬 그대로 */
    private LocalDateTime parseToDbLocal(String tsStr) {
        if (tsStr == null || tsStr.isBlank()) return null;
        String s = tsStr.trim();
        try {
            if (s.endsWith("Z") || s.contains("+") || s.matches(".*[Zz]$")) {
                Instant ins = Instant.parse(s);
                return LocalDateTime.ofInstant(ins, DB_ZONE);   // ← DB 로컬로 변환
            }
            return LocalDateTime.parse(s, DateTimeFormatter.ISO_LOCAL_DATE_TIME); // 로컬 그대로
        } catch (Exception e) {
            throw new IllegalArgumentException("ts 파싱 실패: " + tsStr, e);
        }
    }

    /** repo.findRecentTimestampsByChannel 반환(Object)을 LocalDateTime으로 통일 */
    private LocalDateTime toLdt(Object o) {
        if (o == null) return null;
        if (o instanceof Timestamp t) return t.toLocalDateTime();
        if (o instanceof LocalDateTime l) return l;
        String s = o.toString();
        if (s.length() >= 19) s = s.substring(0, 19);
        return LocalDateTime.parse(s, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    /** ts가 없으면 MAX(ts) 기준, 있으면 해당 ts로 조회 */
    public List<SpectrumDto> getByTimestampIsoOrLatest(String tsStr, List<Integer> channelIds) {
        if (tsStr == null || tsStr.isBlank()) {
            var max = repo.findMaxTimestamp();
            if (max == null) return List.of();
            return repo.findByTsAndChannelIdInOrderByChannelId(max, channelIds)
                    .stream().map(this::toDto).toList();
        }
        LocalDateTime ts = parseToDbLocal(tsStr);
        var exact = repo.findByTsAndChannelIdInOrderByChannelId(ts, channelIds);
        return exact.stream().map(this::toDto).toList();
    }

    /** 채널별 rank번째(ts 내림차순) 스펙트럼을 모아 반환 (rank: 0=최신) */
    public List<SpectrumDto> getByRank(List<Integer> channelIds, int rank) {
        if (rank < 0 || channelIds == null || channelIds.isEmpty()) return List.of();
        List<SpectrumDto> out = new ArrayList<>();

        for (int ch : channelIds) {
            // rank까지 커버되도록 (rank+1)개 ts만 가져오기
            List<LocalDateTime> tsList = repo.findRecentTimestampsByChannel(ch, rank + 1)
                    .stream().map(this::toLdt).toList();
            if (tsList.size() <= rank) continue; // 해당 채널에 데이터 부족 시 스킵

            LocalDateTime target = tsList.get(rank);
            // 근사 매칭(±500ms)으로 안전 조회
            var rows = repo.findNearTsWithin500ms(target, List.of(ch));
            if (!rows.isEmpty()) out.add(toDto(rows.get(0)));
        }

        out.sort(Comparator.comparingInt(d -> d.channelId));
        return out;
    }

    /** 선택 채널들의 "공통 시점"에서 offset번째(0=최신) 스펙트럼 반환 */
    public List<SpectrumDto> getByCommon(List<Integer> channelIds, int offset) {
        if (offset < 0 || channelIds == null || channelIds.isEmpty()) return List.of();

        // 각 채널 최근 N개를 넉넉히 가져와 교집합 계산
        final int N = Math.max(50, offset + 10);
        List<Set<LocalDateTime>> sets = new ArrayList<>();

        for (int ch : channelIds) {
            LinkedHashSet<LocalDateTime> set = new LinkedHashSet<>();
            for (Object o : repo.findRecentTimestampsByChannel(ch, N)) set.add(toLdt(o));
            sets.add(set);
        }
        if (sets.isEmpty()) return List.of();

        // 교집합(최신→과거 정렬)
        Set<LocalDateTime> inter = new LinkedHashSet<>(sets.get(0));
        for (int i = 1; i < sets.size(); i++) inter.retainAll(sets.get(i));
        List<LocalDateTime> common = inter.stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());

        if (offset >= common.size()) return List.of();

        LocalDateTime target = common.get(offset);
        var rows = repo.findNearTsWithin500ms(target, channelIds);
        return rows.stream().map(this::toDto).toList();
    }

    private SpectrumDto toDto(Spectrum s) {
        SpectrumDto dto = new SpectrumDto();
        dto.channelId = s.getChannelId();
        dto.ts        = s.getTs();

        // 주파수를 기준으로 '가장 그럴듯한 포맷'을 자동 선택해서
        // freq/amp를 같은 포맷으로 함께 디코딩
        var pair = ArrayDecoder.decodeSpectrumSmart(s.getFreq(), s.getAmplitude());
        dto.freq      = pair.first;
        dto.amplitude = pair.second;

        return dto;
    }
}