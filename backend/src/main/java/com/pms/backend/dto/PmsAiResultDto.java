package com.pms.backend.dto;

import java.time.LocalDateTime;

public record PmsAiResultDto(LocalDateTime ts, Integer anomalyLvl) {}