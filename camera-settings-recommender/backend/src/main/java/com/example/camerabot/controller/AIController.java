package com.example.camerabot.controller;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import java.util.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {

    private static final String OPENAI_API_URL = "https://openrouter.ai/api/v1/chat/completions";
    private static final String API_KEY = System.getenv("OPENAI_API_KEY");

    @PostMapping("/generate")
    public ResponseEntity<?> generateSettings(@RequestBody Map<String, String> request) {
        if (API_KEY == null || API_KEY.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Missing OpenAI API key"));
        }

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(OPENAI_API_URL);

            String prompt = request.get("prompt");
            String jsonPayload = String.format("""
                {
                  "model": "gpt-3.5-turbo",
                  "messages": [
                    {"role": "system", "content": "You are a photography assistant that generates detailed camera settings."},
                    {"role": "user", "content": "Generate camera settings for: %s. Respond in bullet points."}
                  ],
                  "temperature": 0.7
                }
                """, prompt);

            httpPost.setEntity(new StringEntity(jsonPayload));
            httpPost.setHeader("Content-Type", "application/json");
            httpPost.setHeader("Authorization", "Bearer " + API_KEY);

            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                String responseBody = EntityUtils.toString(response.getEntity());
                String settings = extractSettings(responseBody);
                return ResponseEntity.ok(Map.of("settings", settings));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to generate settings"));
        }
    }

    private String extractSettings(String apiResponse) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(apiResponse);
            JsonNode choices = root.get("choices");
    
            if (choices != null && choices.isArray() && choices.size() > 0) {
                JsonNode messageNode = choices.get(0).get("message");
                if (messageNode != null && messageNode.has("content")) {
                    return messageNode.get("content").asText().trim();
                }
            }
            return "[!] No settings returned.";
        } catch (Exception e) {
            e.printStackTrace();
            return "[!] Failed to parse response.";
        }
    }    

}
