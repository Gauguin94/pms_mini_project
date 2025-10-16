package com.pms.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "velocity_tbl")
public class Velocity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ts", nullable = false, columnDefinition = "DATETIME(6)")
    private LocalDateTime ts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id", nullable = false,
            foreignKey = @ForeignKey(name = "velocity_tbl_ibfk_1"))
    private ChannelSpec channel;

    @Lob
    @Column(name = "velocity_arr", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String velocityArr;

    public Velocity() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getTs() { return ts; }
    public void setTs(LocalDateTime ts) { this.ts = ts; }

    public ChannelSpec getChannel() { return channel; }
    public void setChannel(ChannelSpec channel) { this.channel = channel; }

    public String getVelocityArr() { return velocityArr; }
    public void setVelocityArr(String velocityArr) { this.velocityArr = velocityArr; }
}

// http://localhost:8080/api/velocity/latest?channelId=1&limit=3