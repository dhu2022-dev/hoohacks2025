package com.example.camerabot.controller;

import com.example.camerabot.service.PythonService;
import com.example.camerabot.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {

    private final S3Service s3Service;
    private final PythonService pythonService;

    @Autowired
    public FileUploadController(S3Service s3Service, PythonService pythonService) {
        this.s3Service = s3Service;
        this.pythonService = pythonService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> handleFileUpload(
            @RequestParam("file") MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();
            String filename = UUID.randomUUID() + "_" + originalFilename;
            System.out.println(System.getenv("AWS_ACCESS_KEY_ID"));
            System.out.println("pong");
            // Upload the original file to S3 directly
            s3Service.uploadFile(file, "uploads", filename);
            System.out.println("filename" + filename);
            // Process with Python
            String resultFilename = pythonService.processImage(filename);
            System.out.println("Uploaded");
            return ResponseEntity.ok()
                    .body(Map.of(
                            "imageFilename", filename,
                            "resultFilename", resultFilename
                    ));

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/results/{filename:.+}")
    public ResponseEntity<Map<String, Object>> getResults(
            @PathVariable String filename) {
        try {
            String imageUrl = s3Service.getFileUrl("uploads", filename);
            String resultKey = "";
            if(filename.contains(".jpg")) {
                resultKey = "results/" + filename.replace(".jpg", ".json");

            } else {
                resultKey = "results/" + filename.replace(".JPG", ".json");
            }

            // Fetch the result JSON from S3
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket("shuttersense-bucket")
                    .key(resultKey)
                    .build();

            //Error in this line of code below
            System.out.println(resultKey);
            ResponseInputStream<?> resultStream = s3Service.getClient().getObject(getObjectRequest);
            System.out.println("Yay");
            String resultJson = new String(resultStream.readAllBytes());

            System.out.println("Retrieved from S3:");
            System.out.println("Image: " + imageUrl);
            System.out.println("Results: " + resultJson);

            return ResponseEntity.ok()
                    .body(Map.of(
                            "imageUrl", imageUrl,
                            "resultJson", resultJson
                    ));
        } catch (Exception e) {
            System.out.println("pong :(");
            System.out.println(e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Expose S3Client for use in getResults
    public S3Service getS3Service() {
        return s3Service;
    }
}