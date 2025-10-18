package com.pms.backend.service;

import com.pms.backend.dto.PmsAiResultDto;
import com.pms.backend.dto.PmsAiResultSimpleDto;
import com.pms.backend.repository.PmsAiResultRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Comparator;
import java.util.List;

@Service
public class PmsAiResultService {

    private final PmsAiResultRepository repo;
    private final JdbcTemplate jdbcTemplate;

    public PmsAiResultService(PmsAiResultRepository repo, JdbcTemplate jdbcTemplate) {
        this.repo = repo;
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<PmsAiResultDto> getLatest(Integer channelId, int limit) {
        int safe = Math.max(1, Math.min(limit, 200));
        var pageable = PageRequest.of(0, safe, Sort.by(Sort.Direction.DESC, "ts"));
        var rowsDesc = repo.findByChannel_Id(channelId, pageable);
        var rowsAsc = rowsDesc.stream().sorted(Comparator.comparing(r -> r.getTs())).toList();
        return rowsAsc.stream()
                .map(r -> new PmsAiResultDto(r.getTs(), r.getAnomalyLvl()))
                .toList();
    }

    /**
     * 단일 베어링 AI 결과 조회 (DB 실제 스키마 기반)
     * DB 테이블: pms_ai_result (id, result, created_at)
     * 
     * @param limit 조회할 데이터 개수 (기본값: 50, 최대: 200)
     * @return PMS AI 결과 리스트 (최신순 정렬)
     */
    public List<PmsAiResultSimpleDto> getSingleBearingAiResults(int limit) {
        
        int safe = Math.max(1, Math.min(limit, 200));
        
        String sql = "SELECT id, result, created_at FROM pms_ai_result ORDER BY id DESC LIMIT ?";
        
        return jdbcTemplate.query(sql, 
            (rs, rowNum) -> new PmsAiResultSimpleDto(
                rs.getInt("id"),
                rs.getInt("result"),
                rs.getTimestamp("created_at").toLocalDateTime()
            ),
            safe
        );
    }
}

