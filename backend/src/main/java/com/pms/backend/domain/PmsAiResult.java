package com.pms.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pms_ai_result")
public class PmsAiResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ts", nullable = false, columnDefinition = "DATETIME(6)")
    private LocalDateTime ts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id", nullable = false,
            foreignKey = @ForeignKey(name = "pms_ai_result_ibfk_1"))
    private ChannelSpec channel;

    @Column(name = "anomaly_lvl")
    private Integer anomalyLvl;

    public PmsAiResult() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getTs() { return ts; }
    public void setTs(LocalDateTime ts) { this.ts = ts; }

    public ChannelSpec getChannel() { return channel; }
    public void setChannel(ChannelSpec channel) { this.channel = channel; }

    public Integer getAnomalyLvl() { return anomalyLvl; }
    public void setAnomalyLvl(Integer anomalyLvl) { this.anomalyLvl = anomalyLvl; }
}