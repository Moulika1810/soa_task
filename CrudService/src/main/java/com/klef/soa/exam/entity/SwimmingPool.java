
package com.klef.soa.exam.entity;

import jakarta.persistence.*;

@Entity
public class SwimmingPool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String poolName;
    private String location;
    private Double lengthMeters;
    private Boolean heated;

    public SwimmingPool() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPoolName() {
        return poolName;
    }

    public void setPoolName(String poolName) {
        this.poolName = poolName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getLengthMeters() {
        return lengthMeters;
    }

    public void setLengthMeters(Double lengthMeters) {
        this.lengthMeters = lengthMeters;
    }

    public Boolean getHeated() {
        return heated;
    }

    public void setHeated(Boolean heated) {
        this.heated = heated;
    }
}
