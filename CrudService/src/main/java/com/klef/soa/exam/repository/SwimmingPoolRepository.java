
package com.klef.soa.exam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.soa.exam.entity.SwimmingPool;

public interface SwimmingPoolRepository
        extends JpaRepository<SwimmingPool, Long> {
}
