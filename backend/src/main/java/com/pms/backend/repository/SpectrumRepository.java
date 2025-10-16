// src/main/java/com/pms/backend/repository/SpectrumRepository.java
package com.pms.backend.repository;

import com.pms.backend.domain.Spectrum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface SpectrumRepository extends JpaRepository<Spectrum, Long> {

    @Query(value = """
            SELECT DISTINCT ts
            FROM spectrum_tbl
            WHERE channel_id = :channelId
            ORDER BY ts DESC
            LIMIT :limit
            """, nativeQuery = true)
    List<Object> findRecentTimestampsByChannel(@Param("channelId") int channelId,
                                               @Param("limit") int limit);

    // 정확히 일치(기존)
    List<Spectrum> findByTsAndChannelIdInOrderByChannelId(LocalDateTime ts,
                                                          Collection<Integer> channelIds);

    // ts 근사 매칭(±500ms 허용). DATETIME(3) 기준.
    @Query(value = """
            SELECT *
            FROM spectrum_tbl
            WHERE channel_id IN (:channelIds)
              AND ABS(TIMESTAMPDIFF(MICROSECOND, ts, :ts)) < 500000
            ORDER BY channel_id
            """, nativeQuery = true)
    List<Spectrum> findNearTsWithin500ms(@Param("ts") LocalDateTime ts,
                                         @Param("channelIds") Collection<Integer> channelIds);

    // 채널별 최신(per-channel)
    @Query(value = """
            SELECT s.*
            FROM spectrum_tbl s
            JOIN (
              SELECT channel_id, MAX(ts) AS max_ts
              FROM spectrum_tbl
              WHERE channel_id IN (:channelIds)
              GROUP BY channel_id
            ) m ON s.channel_id = m.channel_id AND s.ts = m.max_ts
            ORDER BY s.channel_id
            """, nativeQuery = true)
    List<Spectrum> findLatestPerChannel(@Param("channelIds") Collection<Integer> channelIds);

    @Query("SELECT MAX(s.ts) FROM Spectrum s")
    LocalDateTime findMaxTimestamp();
}
