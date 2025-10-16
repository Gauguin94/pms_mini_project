package com.pms.backend.controller;

import com.pms.backend.dto.VrmsDto;
import com.pms.backend.service.VrmsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/vrms")
public class VrmsController {

    private final VrmsService vrmsService;

    public VrmsController(VrmsService vrmsService) {
        this.vrmsService = vrmsService;
    }

    @GetMapping("/latest")
    public List<VrmsDto> getVrmsLatest(
            @RequestParam(name = "channelId", required = true) Integer channelId,
            @RequestParam(name = "limit", defaultValue = "100") Integer limit) {
        return vrmsService.getLatest(channelId, limit);
    }

    // @GetMapping("/latest")
    // public List<VrmsDto> getVrmsLatest(
    //         @RequestParam Integer channelId,
    //         @RequestParam(defaultValue = "100") Integer limit) {
    //     return vrmsService.getLatest(channelId, limit);
    // }
}