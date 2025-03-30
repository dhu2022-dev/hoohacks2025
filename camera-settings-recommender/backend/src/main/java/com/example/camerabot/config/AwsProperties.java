package com.example.camerabot.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "aws")
public class AwsProperties {
    private String accessKeyId;
    private String secretKey;
    private String region;
    private String s3BucketName;

    // Getters and setters
    public String getAccessKeyId() { return accessKeyId; }
    public void setAccessKeyId(String accessKeyId) { this.accessKeyId = accessKeyId; }

    public String getSecretKey() { return secretKey; }
    public void setSecretKey(String secretKey) { this.secretKey = secretKey; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getS3BucketName() { return s3BucketName; }
    public void setS3BucketName(String s3BucketName) { this.s3BucketName = s3BucketName; }
}