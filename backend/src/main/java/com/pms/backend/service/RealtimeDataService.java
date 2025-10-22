package com.pms.backend.service;

import com.pms.backend.dto.RealtimeDataDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RealtimeDataService {

    private final JdbcTemplate jdbcTemplate;

    public RealtimeDataService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * 최신 realtime 데이터 조회
     * @param limit 조회할 데이터 개수 (기본값: 50, 최대: 500)
     * @return RealtimeDataDto 리스트
     */
    public List<RealtimeDataDto> getLatestData(int limit) {
        int safeLimit = Math.max(1, Math.min(limit, 500));
        
        String sql = "SELECT * FROM realtime_table LIMIT ?";
        
        return jdbcTemplate.query(sql, 
            (rs, rowNum) -> new RealtimeDataDto(
                (long) rowNum,  // ID 대신 row number 사용
                rs.getDouble("time_rms"),
                rs.getDouble("time_skewness"),
                rs.getDouble("time_kurtosis"),
                rs.getDouble("time_crest_factor"),
                rs.getDouble("time_shape_factor"),
                rs.getDouble("time_mean"),
                rs.getDouble("time_std"),
                rs.getDouble("time_peak"),
                rs.getDouble("time_mean_diff"),
                rs.getDouble("time_std_diff"),
                rs.getDouble("time_min_diff"),
                rs.getDouble("time_max_diff"),
                rs.getDouble("fft_centroid"),
                rs.getDouble("fft_bandwidth"),
                rs.getDouble("fft_peak_freq"),
                rs.getDouble("fft_over_env"),
                rs.getDouble("fft_amp_1x"),
                rs.getDouble("fft_amp_2x"),
                rs.getDouble("fft_amp_3x"),
                rs.getDouble("fft_amp_4x"),
                rs.getDouble("fft_amp_5x"),
                rs.getDouble("cD1_rms"),
                rs.getDouble("cD1_kurtosis"),
                rs.getDouble("cD2_rms"),
                rs.getDouble("cD2_kurtosis"),
                rs.getDouble("cD3_rms"),
                rs.getDouble("cD3_kurtosis"),
                rs.getDouble("cD4_rms"),
                rs.getDouble("cD4_kurtosis"),
                rs.getDouble("cD5_rms"),
                rs.getDouble("cD5_kurtosis"),
                rs.getDouble("cD6_rms"),
                rs.getDouble("cD6_kurtosis"),
                rs.getDouble("cD7_rms"),
                rs.getDouble("cD7_kurtosis")
            ),
            safeLimit
        );
    }
}

