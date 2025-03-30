package com.example.camerabot.service;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

@Service
public class S3Service {

    private static final String BUCKET = "shuttersense-bucket";
    private static final String UPLOAD_FOLDER = "uploads";
    private static final String RESULT_FOLDER = "results";
    private static final String KEY_FORMAT = "%s/%s";
    private S3Client client;
    private final Region region = Region.US_EAST_1;

    @PostConstruct
    public void init() {
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

        String accessKey = dotenv.get("AWS_ACCESS_KEY_ID");
        String secretKey = dotenv.get("AWS_SECRET_ACCESS_KEY");
        String region = dotenv.get("AWS_REGION");

        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
        this.client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();
    }

    public S3Service() {
        this.client = S3Client.builder()
                .region(region)
                .build();
    }

    // Updated uploadFile method for MultipartFile with custom fileName
    public void uploadFile(MultipartFile file, String folder, String fileName) throws IOException {
        String key = KEY_FORMAT.formatted(folder, fileName); // Use the custom fileName
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(BUCKET)
                .key(key)
                .build();
        client.putObject(objectRequest, RequestBody.fromBytes(file.getBytes()));
    }

    // Updated uploadFile method for File with custom fileName
    public void uploadFile(File file, String folder, String fileName) throws IOException {
        String key = KEY_FORMAT.formatted(folder, fileName); // Use the custom fileName
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(BUCKET)
                .key(key)
                .build();
        client.putObject(objectRequest, RequestBody.fromFile(file));
    }

    public String getFileUrl(String folder, String filename) {
        return client.utilities().getUrl(b -> b
                .bucket(BUCKET)
                .key(String.format("%s/%s", folder, filename))
        ).toExternalForm();
    }

    public void downloadFile(String folder, String filename, String destinationPath) throws IOException {
        String key = String.format("%s/%s", folder, filename);

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(BUCKET)
                .key(key)
                .build();

        client.getObject(getObjectRequest, Paths.get(destinationPath));
    }

    public S3Client getClient() {
        return client;
    }
}