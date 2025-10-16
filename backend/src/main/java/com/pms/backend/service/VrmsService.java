package com.pms.backend.service;

import com.pms.backend.dto.VrmsDto;
import com.pms.backend.repository.VrmsRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class VrmsService {

    private final VrmsRepository vrmsRepository;

    public VrmsService(VrmsRepository vrmsRepository) {
        this.vrmsRepository = vrmsRepository;
    }

    /** 채널별 최신 N건(내림차순으로 가져온 뒤, 응답은 시간 오름차순 정렬) */
    public List<VrmsDto> getLatest(Integer channelId, int limit) {
        var safeLimit = Math.max(1, Math.min(limit, 5000));
        var pageable = PageRequest.of(0, safeLimit, Sort.by(Sort.Direction.DESC, "ts"));
        var desc = vrmsRepository.findByChannel_Id(channelId, pageable);
        var asc = desc.stream()
                .sorted(Comparator.comparing(v -> v.getTs()))
                .toList();
        return asc.stream()
                .map(v -> new VrmsDto(v.getTs(), v.getVrms()))
                .toList();
    }
}
