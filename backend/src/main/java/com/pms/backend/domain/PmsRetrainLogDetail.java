package com.pms.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pms_retrain_log_detail")
public class PmsRetrainLogDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "log_id", nullable = false)
    private Integer logId;

    @Column(nullable = false)
    private Integer seq;

    @Column(length = 10, nullable = false)
    private String level = "INFO";

    @Column(columnDefinition = "MEDIUMTEXT")
    private String text;

    @Column(nullable = false)
    private LocalDateTime ts;

    // Constructors
    public PmsRetrainLogDetail() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLogId() {
        return logId;
    }

    public void setLogId(Integer logId) {
        this.logId = logId;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getTs() {
        return ts;
    }

    public void setTs(LocalDateTime ts) {
        this.ts = ts;
    }
}

