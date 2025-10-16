package com.pms.backend.dto;

import java.time.LocalDateTime;

public record VelocityDto(LocalDateTime ts, double[] velocity) {}
