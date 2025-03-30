package com.example.camerabot.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class S3Service {

    private static final String bucket = "hoohacks-2025-photography-app";
    private static final String uploadFolder = "uploads";
    private static final String keyFormat = "%s/%s";
    private final S3Client client;

    public S3Service() {
        this.client = S3Client.builder()
                .region(Region.US_EAST_2)
                .build();
    }
    public void uploadFile(MultipartFile file, String id) throws IOException {
        PutObjectRequest object = PutObjectRequest.builder()
                .bucket(bucket)
                .key(keyFormat.formatted(uploadFolder,file.getOriginalFilename()))
                .build();
        client.putObject(object, RequestBody.fromBytes(file.getBytes()));
    }
}