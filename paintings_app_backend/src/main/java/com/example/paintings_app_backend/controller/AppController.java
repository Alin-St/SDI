package com.example.paintings_app_backend.controller;

import com.example.paintings_app_backend.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/app")
public class AppController {
    final AppService service;

    @Autowired
    public AppController(AppService service) {
        this.service = service;
    }

    @PostMapping("/resetall")
    public ResponseEntity<Void> resetAll() {
        testSleep();
        service.resetEntities();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteall")
    public ResponseEntity<Void> deleteAll() {
        testSleep();
        service.deleteAllEntities();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    void testSleep() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
