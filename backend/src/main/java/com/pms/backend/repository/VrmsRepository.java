package com.pms.backend.repository;

import com.pms.backend.domain.Vrms;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VrmsRepository extends JpaRepository<Vrms, Long> {
    List<Vrms> findByChannel_Id(Integer channelId, Pageable pageable);
}