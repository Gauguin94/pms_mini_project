package com.pms.backend.dto;

import java.time.LocalDateTime;

public record VrmsDto(LocalDateTime ts, Double vrms) {}