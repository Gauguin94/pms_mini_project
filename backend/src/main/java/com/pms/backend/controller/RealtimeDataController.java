package com.pms.backend.controller;

import com.pms.backend.dto.RealtimeDataDto;
import com.pms.backend.service.RealtimeDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/realtime")
public class RealtimeDataController {

    private final RealtimeDataService service;

    public RealtimeDataController(RealtimeDataService service) {
        this.service = service;
    }

    /**
     * 최신 realtime 데이터 조회
     * 
     * @param limit 조회할 데이터 개수 (기본값: 50, 최대: 500)
     * @return RealtimeDataDto 리스트
     * 
     * Example: GET /api/realtime?limit=100
     */
    @GetMapping
    public ResponseEntity<List<RealtimeDataDto>> getLatestData(
            @RequestParam(defaultValue = "50") int limit) {
        
        List<RealtimeDataDto> data = service.getLatestData(limit);
        return ResponseEntity.ok(data);
    }
}

