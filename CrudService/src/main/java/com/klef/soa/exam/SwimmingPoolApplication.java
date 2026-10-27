package com.klef.soa.exam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SwimmingPoolApplication {

    public static void main(String[] args) {
        SpringApplication.run(SwimmingPoolApplication.class, args);
        System.out.println("Exam Service Project is running");
    }
}