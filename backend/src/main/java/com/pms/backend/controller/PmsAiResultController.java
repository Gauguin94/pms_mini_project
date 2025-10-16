package com.pms.backend.controller;

import com.pms.backend.dto.PmsAiResultDto;
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
}