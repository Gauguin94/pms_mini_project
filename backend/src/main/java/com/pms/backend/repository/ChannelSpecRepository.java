package com.pms.backend.repository;

import com.pms.backend.domain.ChannelSpec;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelSpecRepository extends JpaRepository<ChannelSpec, Integer> {
    // 추가 커스텀 쿼리 메서드가 필요하면 여기에 작성
}
