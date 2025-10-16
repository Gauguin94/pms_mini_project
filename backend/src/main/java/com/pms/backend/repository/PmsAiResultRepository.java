package com.pms.backend.repository;

import com.pms.backend.domain.PmsAiResult;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PmsAiResultRepository extends JpaRepository<PmsAiResult, Long> {
    List<PmsAiResult> findByChannel_Id(Integer channelId, Pageable pageable);
}
