package com.pms.backend.service;

import com.pms.backend.dto.PmsAiResultDto;
import com.pms.backend.repository.PmsAiResultRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class PmsAiResultService {

    private final PmsAiResultRepository repo;

    public PmsAiResultService(PmsAiResultRepository repo) {
        this.repo = repo;
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
}
