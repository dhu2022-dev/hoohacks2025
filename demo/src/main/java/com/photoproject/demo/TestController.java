package com.photoproject.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.s3.S3Client;

@RestController
public class TestController {

    @Autowired
    private S3Client client;

    @GetMapping("/test-db")
    public String testConnection() {
        return "Tee HEe ";
    }
}
