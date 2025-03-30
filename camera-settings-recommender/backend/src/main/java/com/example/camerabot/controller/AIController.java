package com.example.camerabot.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {

    private static final String LLAMA_API_URL = "https://api.llama.ai/v1/completions";
    private static final String API_KEY = "${LLAMA_API_KEY}"; // Use environment variable

    @PostMapping("/generate")
    public ResponseEntity<?> generateSettings(@RequestBody Map<String, String> request) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(LLAMA_API_URL);

            // Construct LLAMA API request
            String jsonPayload = String.format(
                    "{ \"prompt\": \"Generate camera settings for: %s. Response format: bullet points\", \"max_tokens\": 200 }",
                    request.get("prompt")
            );

            httpPost.setEntity(new StringEntity(jsonPayload));
            httpPost.setHeader("Content-Type", "application/json");
            httpPost.setHeader("Authorization", "Bearer " + API_KEY);

            // Execute request
            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                String responseBody = EntityUtils.toString(response.getEntity());

                // Parse and return response
                Map<String, String> result = new HashMap<>();
                result.put("settings", extractSettings(responseBody));
                return ResponseEntity.ok(result);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to generate settings"));
        }
    }

    private String extractSettings(String apiResponse) {
        // Implement parsing logic based on LLAMA's response format
        return apiResponse; // Modify this based on actual API response structure
    }
}