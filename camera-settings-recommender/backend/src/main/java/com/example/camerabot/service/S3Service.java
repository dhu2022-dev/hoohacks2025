package com.example.camerabot.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;

import java.io.File;
import java.io.IOException;

@Service
public class S3Service {

    private static final String BUCKET = "hoohacks-2025-photography-app";
    private static final String UPLOAD_FOLDER = "uploads";
    private static final String RESULT_FOLDER = "results";
    private static final String KEY_FORMAT = "%s/%s";
    private final S3Client client;
    private final Region region = Region.US_EAST_2;

    public S3Service() {
        this.client = S3Client.builder()
                .region(region)
                .build();
    }

    public void uploadFile(MultipartFile file, String folder) throws IOException {
        String key = KEY_FORMAT.formatted(folder, file.getOriginalFilename());
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(BUCKET)
                .key(key)
                .acl("public-read")  // Crucial for public access
                .build();
        client.putObject(objectRequest, RequestBody.fromBytes(file.getBytes()));
    }

    public void uploadFile(File file, String folder) throws IOException {
        String key = KEY_FORMAT.formatted(folder, file.getName());
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(BUCKET)
                .key(key)
                .acl("public-read")  // Crucial for public access
                .build();
        client.putObject(objectRequest, RequestBody.fromFile(file));
    }

    public String getFileUrl(String folder, String filename) {
        String key = KEY_FORMAT.formatted(folder, filename);
        return client.utilities().getUrl(GetUrlRequest.builder()
                .bucket(BUCKET)
                .key(key)
                .build()).toExternalForm();
    }

    public S3Client getClient() {
        return client;
    }
}