package com.pms.backend.controller;

import com.pms.backend.dto.PmsRetrainLogDetailDto;
import com.pms.backend.service.PmsRetrainLogDetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/retrain/detail")
public class PmsRetrainLogDetailController {

    private final PmsRetrainLogDetailService service;

    public PmsRetrainLogDetailController(PmsRetrainLogDetailService service) {
        this.service = service;
    }

    /**
     * 특정 log_id의 상세 로그 조회 (seq 순서대로)
     * 
     * @param logId 재학습 로그 ID
     * @return 상세 로그 리스트
     * 
     * Example: GET /api/retrain/detail/by-log-id?logId=1
     */
    @GetMapping("/by-log-id")
    public ResponseEntity<List<PmsRetrainLogDetailDto>> getDetailsByLogId(
            @RequestParam Integer logId) {
        
        List<PmsRetrainLogDetailDto> details = service.getDetailsByLogId(logId);
        return ResponseEntity.ok(details);
    }

    /**
     * 최신 상세 로그 조회
     * 
     * @param limit 조회할 데이터 개수 (기본값: 50, 최대: 500)
     * @return 상세 로그 리스트
     * 
     * Example: GET /api/retrain/detail?limit=100
     */
    @GetMapping
    public ResponseEntity<List<PmsRetrainLogDetailDto>> getLatestDetails(
            @RequestParam(defaultValue = "50") int limit) {
        
        List<PmsRetrainLogDetailDto> details = service.getLatestDetails(limit);
        return ResponseEntity.ok(details);
    }

    /**
     * 특정 log_id의 최신 상세 로그 조회
     * 
     * @param logId 재학습 로그 ID
     * @param limit 조회할 데이터 개수 (기본값: 50, 최대: 500)
     * @return 상세 로그 리스트
     * 
     * Example: GET /api/retrain/detail/latest-by-log-id?logId=1&limit=20
     */
    @GetMapping("/latest-by-log-id")
    public ResponseEntity<List<PmsRetrainLogDetailDto>> getLatestDetailsByLogId(
            @RequestParam Integer logId,
            @RequestParam(defaultValue = "50") int limit) {
        
        List<PmsRetrainLogDetailDto> details = service.getLatestDetailsByLogId(logId, limit);
        return ResponseEntity.ok(details);
    }
}

