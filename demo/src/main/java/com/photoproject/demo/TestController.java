package com.photoproject.demo;

import com.photoproject.demo.model.TestEntity;
import com.photoproject.demo.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @Autowired
    private TestRepository testRepository;

    @GetMapping("/test-db")
    public String testConnection() {
        TestEntity test = new TestEntity();
        test.setMessage("Hello from DigitalOcean MySQL");
        testRepository.save(test);

        return "✅ Saved to DB with ID: " + test.getId();
    }
}
