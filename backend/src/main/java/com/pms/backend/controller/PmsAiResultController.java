package com.pms.backend.controller;

import com.pms.backend.dto.PmsAiResultDto;
import com.pms.backend.dto.PmsAiResultSimpleDto;
import com.pms.backend.service.PmsAiResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/airesult")
public class PmsAiResultController {

    private final PmsAiResultService service;

    public PmsAiResultController(PmsAiResultService service) {
        this.service = service;
    }

    @GetMapping("/latest")
    public List<PmsAiResultDto> latest(
            @RequestParam Integer channelId,
            @RequestParam(defaultValue = "50") Integer limit
    ) {
        return service.getLatest(channelId, limit);
    }

    /**
     * 단일 베어링 AI 결과 조회 (DB 실제 스키마 기반)
     * DB 테이블: pms_ai_result (id, result, created_at)
     * 
     * @param limit 조회할 데이터 개수 (기본값: 50, 최대: 200)
     * @return PMS AI 결과 리스트
     */
    @GetMapping("/single")
    public List<PmsAiResultSimpleDto> getSingleBearingAiResults(
            @RequestParam(defaultValue = "50") Integer limit
    ) {
        return service.getSingleBearingAiResults(limit);
    }
}
