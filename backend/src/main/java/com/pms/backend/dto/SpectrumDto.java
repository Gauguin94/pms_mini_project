package com.pms.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class SpectrumDto {
    public int channelId;
    public LocalDateTime ts;
    public List<Double> freq;
    public List<Double> amplitude;
}
