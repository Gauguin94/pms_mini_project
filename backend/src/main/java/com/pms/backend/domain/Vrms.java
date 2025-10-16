package com.pms.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vrms_tbl")
public class Vrms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ts", nullable = false, columnDefinition = "DATETIME(6)")
    private LocalDateTime ts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id", nullable = false,
            foreignKey = @ForeignKey(name = "vrms_tbl_ibfk_1"))
    private ChannelSpec channel;

    @Column(name = "vrms", nullable = false)
    private Double vrms;

    public Vrms() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getTs() { return ts; }
    public void setTs(LocalDateTime ts) { this.ts = ts; }

    public ChannelSpec getChannel() { return channel; }
    public void setChannel(ChannelSpec channel) { this.channel = channel; }

    public Double getVrms() { return vrms; }
    public void setVrms(Double vrms) { this.vrms = vrms; }
}

// http://localhost:8080/api/vrms/latest?channelId=1&limit=200