package com.pms.backend.service;

import com.pms.backend.domain.PmsRetrainLogDetail;
import com.pms.backend.dto.PmsRetrainLogDetailDto;
import com.pms.backend.repository.PmsRetrainLogDetailRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PmsRetrainLogDetailService {

    private final PmsRetrainLogDetailRepository repository;

    public PmsRetrainLogDetailService(PmsRetrainLogDetailRepository repository) {
        this.repository = repository;
    }

    /**
     * 특정 log_id의 상세 로그 조회 (seq 순서대로)
     */
    public List<PmsRetrainLogDetailDto> getDetailsByLogId(Integer logId) {
        List<PmsRetrainLogDetail> details = repository.findByLogIdOrderBySeqAsc(logId);
        return details.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 최신 상세 로그 조회
     */
    public List<PmsRetrainLogDetailDto> getLatestDetails(int limit) {
        int safeLimit = Math.max(1, Math.min(limit, 500));
        PageRequest pageRequest = PageRequest.of(0, safeLimit);
        
        List<PmsRetrainLogDetail> details = repository.findAllByOrderByIdDesc(pageRequest);
        return details.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 특정 log_id의 최신 상세 로그 조회
     */
    public List<PmsRetrainLogDetailDto> getLatestDetailsByLogId(Integer logId, int limit) {
        int safeLimit = Math.max(1, Math.min(limit, 500));
        PageRequest pageRequest = PageRequest.of(0, safeLimit);
        
        List<PmsRetrainLogDetail> details = repository.findByLogIdOrderByIdDesc(logId, pageRequest);
        return details.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Entity를 DTO로 변환
     */
    private PmsRetrainLogDetailDto convertToDto(PmsRetrainLogDetail entity) {
        return new PmsRetrainLogDetailDto(
                entity.getId(),
                entity.getLogId(),
                entity.getSeq(),
                entity.getLevel(),
                entity.getText(),
                entity.getTs()
        );
    }
}

