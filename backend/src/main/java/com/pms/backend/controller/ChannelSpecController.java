package com.pms.backend.controller;

import com.pms.backend.dto.ChannelSpecDto;
import com.pms.backend.service.ChannelSpecService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/channels")
public class ChannelSpecController {

    private final ChannelSpecService service;

    public ChannelSpecController(ChannelSpecService service) {
        this.service = service;
    }

    /** 채널 전체 목록 */
    @GetMapping
    public List<ChannelSpecDto> list() {
        return service.list();
    }

    /** 채널 단건 조회 */
    @GetMapping("/{id}")
    public ChannelSpecDto get(@PathVariable Integer id) {
        return service.get(id);
    }
}
