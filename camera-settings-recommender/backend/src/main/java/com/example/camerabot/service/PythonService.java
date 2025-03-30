package com.example.camerabot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.util.stream.Collectors;

@Service
public class PythonService {

    private final S3Service s3Service;
    private final Path pythonVenvPath;
    private final Path requirementsPath;
    private final Path pythonScriptPath;

    @Autowired
    public PythonService(S3Service s3Service) {
        this.s3Service = s3Service;
        this.pythonVenvPath = Paths.get("src/main/resources/image-matching/venv");
        this.requirementsPath = Paths.get("src/main/resources/image-matching/requirements.txt");
        this.pythonScriptPath = Paths.get("src/main/resources/image-matching/match_from_s3.py");
    }

    public String processImage(String filename) throws Exception {
        try {
            // Ensure Python environment is ready
            ensurePythonEnvironment();

            // Download image from S3 to temp file
            Path tempImagePath = Paths.get(System.getProperty("java.io.tmpdir"), filename);
            s3Service.downloadFile("uploads", filename, tempImagePath.toString());

            // Prepare Python process
            ProcessBuilder pb = new ProcessBuilder(
                    getPythonExecutable(),
                    pythonScriptPath.toString(),
                    tempImagePath.toString()
            );

            // Set working directory to project root
            pb.directory(new File(System.getProperty("user.dir")));
            pb.redirectErrorStream(true);

            // Start process and capture output
            Process process = pb.start();
            String resultJson;
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                resultJson = reader.lines().collect(Collectors.joining("\n"));
            }

            // Check for errors
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new Exception("Python script failed with code " + exitCode +
                        "\nOutput: " + resultJson);
            }

            // Process and upload results
            return processResultJson(resultJson, filename);

        } catch (Exception e) {
            throw new Exception("Python processing error: " + e.getMessage(), e);
        }
    }

    private void ensurePythonEnvironment() throws Exception {
        if (!Files.exists(pythonVenvPath)) {
            createVirtualEnvironment();
        }
        if (!isEnvironmentValid()) {
            installDependencies();
        }
    }

    private void createVirtualEnvironment() throws Exception {
        ProcessBuilder pb = new ProcessBuilder(
                getSystemPython(),
                "-m", "venv",
                pythonVenvPath.toString()
        );
        runProcess(pb, "Failed to create virtual environment");
    }

    private boolean isEnvironmentValid() throws Exception {
        if (!Files.exists(requirementsPath)) {
            return true; // No requirements to check
        }

        ProcessBuilder pb = new ProcessBuilder(
                getPythonExecutable(),
                "-m", "pip", "freeze"
        );
        Process process = pb.start();
        String installedPackages = new BufferedReader(
                new InputStreamReader(process.getInputStream()))
                .lines().collect(Collectors.joining("\n"));

        String requiredPackages = Files.readString(requirementsPath);
        return requiredPackages.lines()
                .allMatch(line -> installedPackages.contains(line.split("==")[0]));
    }

    private void installDependencies() throws Exception {
        ProcessBuilder pb = new ProcessBuilder(
                getPythonExecutable(),
                "-m", "pip", "install",
                "-r", requirementsPath.toString()
        );
        runProcess(pb, "Failed to install dependencies");
    }

    private String processResultJson(String resultJson, String filename) throws Exception {
        String resultFilename = filename.replace(".jpg", ".json");
        Path resultPath = Paths.get(System.getProperty("java.io.tmpdir"), resultFilename);

        Files.write(resultPath, resultJson.getBytes());
        s3Service.uploadFile(resultPath.toFile(), "results", filename);

        Files.deleteIfExists(resultPath);
        return resultFilename;
    }

    private String getPythonExecutable() {
        return System.getProperty("os.name").toLowerCase().contains("win")
                ? pythonVenvPath.resolve("Scripts/python.exe").toString()
                : pythonVenvPath.resolve("bin/python").toString();
    }

    private String getSystemPython() {
        return System.getProperty("os.name").toLowerCase().contains("win")
                ? "python" : "python3";
    }

    private void runProcess(ProcessBuilder pb, String errorMessage) throws Exception {
        pb.redirectErrorStream(true);
        Process process = pb.start();

        String output = new BufferedReader(
                new InputStreamReader(process.getInputStream()))
                .lines().collect(Collectors.joining("\n"));

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new Exception(errorMessage + "\n" + output);
        }
    }
}