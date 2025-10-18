package com.pms.backend.repository;

import com.pms.backend.domain.PmsRetrainLogDetail;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PmsRetrainLogDetailRepository extends JpaRepository<PmsRetrainLogDetail, Long> {
    
    /**
     * log_id로 상세 로그 조회 (seq 순서대로)
     */
    List<PmsRetrainLogDetail> findByLogIdOrderBySeqAsc(Integer logId);
    
    /**
     * 최신 로그 조회 (id 내림차순)
     */
    List<PmsRetrainLogDetail> findAllByOrderByIdDesc(Pageable pageable);
    
    /**
     * 특정 log_id의 최신 로그 조회
     */
    List<PmsRetrainLogDetail> findByLogIdOrderByIdDesc(Integer logId, Pageable pageable);
}

