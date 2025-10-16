package com.pms.backend.controller;

import com.pms.backend.dto.VelocityDto;
import com.pms.backend.service.VelocityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/velocity")
public class VelocityController {

    private final VelocityService service;

    public VelocityController(VelocityService service) {
        this.service = service;
    }

    @GetMapping("/latest")
    public List<VelocityDto> latest(
            @RequestParam Integer channelId,
            @RequestParam(defaultValue = "3") Integer limit
    ) {
        return service.getLatest(channelId, limit);
    }
}
