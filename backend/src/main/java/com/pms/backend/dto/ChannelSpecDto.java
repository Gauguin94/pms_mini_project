package com.pms.backend.dto;

public record ChannelSpecDto(
        Integer id,
        String channelCode,
        String location,
        Integer rpm,
        Integer samplesPerFrame,
        Integer fs
) {}
