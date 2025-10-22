package com.pms.backend.dto;

import java.time.LocalDateTime;

public class PmsRetrainLogDetailDto {
    private Long id;
    private Integer logId;
    private Integer seq;
    private String level;
    private String text;
    private LocalDateTime ts;

    // Constructors
    public PmsRetrainLogDetailDto() {
    }

    public PmsRetrainLogDetailDto(Long id, Integer logId, Integer seq, String level, String text, LocalDateTime ts) {
        this.id = id;
        this.logId = logId;
        this.seq = seq;
        this.level = level;
        this.text = text;
        this.ts = ts;
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

