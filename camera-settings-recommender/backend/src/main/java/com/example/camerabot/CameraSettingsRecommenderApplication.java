package com.example.camerabot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class CameraSettingsRecommenderApplication {
    public static void main(String[] args) {
        SpringApplication.run(CameraSettingsRecommenderApplication.class, args);
    }
}
