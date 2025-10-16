package com.pms.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "spectrum_tbl")
public class Spectrum {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ts", nullable = false)
    private LocalDateTime ts;

    @Column(name = "channel_id", nullable = false)
    private Integer channelId;

    @Lob @Column(name = "freq", nullable = false, columnDefinition = "LONGTEXT")
    private String freq;

    @Lob @Column(name = "amplitude", nullable = false, columnDefinition = "LONGTEXT")
    private String amplitude;

    public Long getId() { return id; }
    public LocalDateTime getTs() { return ts; }
    public void setTs(LocalDateTime ts) { this.ts = ts; }
    public Integer getChannelId() { return channelId; }
    public void setChannelId(Integer channelId) { this.channelId = channelId; }
    public String getFreq() { return freq; }
    public void setFreq(String freq) { this.freq = freq; }
    public String getAmplitude() { return amplitude; }
    public void setAmplitude(String amplitude) { this.amplitude = amplitude; }
}

// http://localhost:8080/api/spectrum/latest?channelId=1&limit=3