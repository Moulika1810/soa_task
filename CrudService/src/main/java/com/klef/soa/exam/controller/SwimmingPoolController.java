
package com.klef.soa.exam.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.klef.soa.exam.entity.SwimmingPool;
import com.klef.soa.exam.service.SwimmingPoolService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SwimmingPoolController {

    private final SwimmingPoolService service;

    public SwimmingPoolController(SwimmingPoolService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String home() {
        return "SwimmingPool CRUD Service is running";
    }

    @PostMapping("/Add")
    public SwimmingPool add(@RequestBody SwimmingPool pool) {
        return service.add(pool);
    }

    @GetMapping("/DisplayAll")
    public List<SwimmingPool> displayAll() {
        return service.displayAll();
    }

    @PutMapping("/Update/{id}")
    public SwimmingPool update(
            @PathVariable Long id,
            @RequestBody SwimmingPool pool) {
        return service.update(id, pool);
    }

    @DeleteMapping("/Delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "SwimmingPool deleted successfully";
    }
}
