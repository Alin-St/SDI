package com.example.paintings_app_backend.controller;

import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.service.PaintingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/paintings")
public class PaintingController {
    final PaintingService service;

    @Autowired
    public PaintingController(PaintingService service) {
        this.service = service;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        testSleep();
        return ResponseEntity.ok("Hello World!");
    }

    @GetMapping("")
    public ResponseEntity<List<Painting>> getAll() {
        testSleep();
        var result = service.getAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Painting>> getById(@PathVariable int id) {
        testSleep();
        var result = service.getById(id);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody Painting painting) {
        testSleep();
        service.add(painting);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable int id, @RequestBody Painting painting) {
        testSleep();
        service.update(id, painting);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        testSleep();
        service.delete(id);
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
