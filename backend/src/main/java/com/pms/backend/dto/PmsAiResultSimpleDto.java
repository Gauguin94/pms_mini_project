package com.pms.backend.dto;

import java.time.LocalDateTime;

/**
 * 간단한 PMS AI 결과 DTO (DB 실제 스키마에 맞춤)
 * DB 테이블: pms_ai_result (id, result, created_at)
 */
public record PmsAiResultSimpleDto(
    Integer id,
    Integer result,
    LocalDateTime createdAt
) {}
