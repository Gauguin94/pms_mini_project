package com.pms.backend.repository;

import com.pms.backend.domain.Velocity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VelocityRepository extends JpaRepository<Velocity, Long> {
    List<Velocity> findByChannel_Id(Integer channelId, Pageable pageable);
}
