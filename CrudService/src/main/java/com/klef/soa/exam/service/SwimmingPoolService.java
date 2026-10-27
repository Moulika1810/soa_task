
package com.klef.soa.exam.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.SwimmingPool;
import com.klef.soa.exam.repository.SwimmingPoolRepository;

@Service
public class SwimmingPoolService {

    private final SwimmingPoolRepository repository;

    public SwimmingPoolService(SwimmingPoolRepository repository) {
        this.repository = repository;
    }

    public SwimmingPool add(SwimmingPool pool) {
        return repository.save(pool);
    }

    public List<SwimmingPool> displayAll() {
        return repository.findAll();
    }

    public SwimmingPool update(Long id, SwimmingPool pool) {
        Optional<SwimmingPool> existing =
                repository.findById(id);

        if (existing.isEmpty()) {
            throw new RuntimeException(
                    "SwimmingPool not found with id: " + id);
        }

        SwimmingPool current = existing.get();

        current.setPoolName(pool.getPoolName());
        current.setLocation(pool.getLocation());
        current.setLengthMeters(pool.getLengthMeters());
        current.setHeated(pool.getHeated());

        return repository.save(current);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
