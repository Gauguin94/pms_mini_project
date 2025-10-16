package com.pms.backend.service;

import com.pms.backend.domain.ChannelSpec;
import com.pms.backend.dto.ChannelSpecDto;
import com.pms.backend.repository.ChannelSpecRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelSpecService {
    private final ChannelSpecRepository repo;

    public ChannelSpecService(ChannelSpecRepository repo) {
        this.repo = repo;
    }

    public List<ChannelSpecDto> list() {
        return repo.findAll().stream().map(this::toDto).toList();
    }

    public ChannelSpecDto get(Integer id) {
        ChannelSpec c = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Channel not found: " + id));
        return toDto(c);
    }

    private ChannelSpecDto toDto(ChannelSpec c) {
        return new ChannelSpecDto(
                c.getId(),
                c.getChannelCode(),
                c.getLocation(),
                c.getRpm(),
                c.getSamplesPerFrame(),
                c.getFs()
        );
    }
}
