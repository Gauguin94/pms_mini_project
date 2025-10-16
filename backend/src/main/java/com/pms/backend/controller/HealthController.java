package com.pms.backend.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    private final JdbcTemplate jdbcTemplate;

    public HealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/health")
    public String health() {
        // DB 연결 확인: SELECT 1 실행
        Integer one = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        return (one != null && one == 1) ? "{\"status\":\"ok\"}" : "{\"status\":\"fail\"}";
    }
}
