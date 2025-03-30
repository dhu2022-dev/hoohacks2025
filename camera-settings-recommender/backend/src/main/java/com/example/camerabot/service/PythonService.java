package com.example.camerabot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service

public class PythonService {

    private final S3Service s3Service;

    @Autowired
    public PythonService(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    public String processImage(String filename) throws Exception {
        try {
            // Construct the S3 URL for the uploaded image
            String imageS3Url = s3Service.getFileUrl("uploads", filename);

            // Update this path to your actual Python script location
            Path pythonScript = Paths.get("src/main/python/match_from_s3.py");

            ProcessBuilder pb = new ProcessBuilder(
                    "python3",
                    pythonScript.toString(),
                    imageS3Url // Pass S3 URL instead of local path
            );

            Process process = pb.start();

            // Read Python output
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));
            String resultJson = reader.readLine();

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                BufferedReader errorReader = new BufferedReader(
                        new InputStreamReader(process.getErrorStream()));
                String error = errorReader.lines().collect(java.util.stream.Collectors.joining("\n"));
                throw new Exception("Python processing failed with code: " + exitCode + ", error: " + error);
            }

            if (resultJson == null || resultJson.trim().isEmpty()) {
                throw new Exception("Python script returned no output");
            }

            // Save the result to a temporary file
            String resultFilename = filename.replace(".jpg", ".json"); // Adjust extension as needed
            File tempResultFile = new File("results", resultFilename);
            tempResultFile.getParentFile().mkdirs(); // Ensure directory exists
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(tempResultFile))) {
                writer.write(resultJson);
            }

            // Upload result to S3
            s3Service.uploadFile(tempResultFile, "results");

            // Clean up temporary file
            tempResultFile.delete();

            return resultFilename;

        } catch (Exception e) {
            throw new Exception("Python processing error: " + e.getMessage());
        }
    }
}