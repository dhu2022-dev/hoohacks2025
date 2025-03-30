package com.example.camerabot.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class AIExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAIException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "error", "AI service unavailable",
                        "details", ex.getMessage()
                ));
    }
}