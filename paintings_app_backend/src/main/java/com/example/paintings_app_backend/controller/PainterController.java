package com.example.paintings_app_backend.controller;

import com.example.paintings_app_backend.domain.Painter;
import com.example.paintings_app_backend.service.PainterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/painters")
public class PainterController {
    final PainterService service;

    @Autowired
    public PainterController(PainterService service) {
        this.service = service;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        testSleep();
        return ResponseEntity.ok("Hello from PainterController!");
    }

    @GetMapping("")
    public ResponseEntity<List<Painter>> getAll() {
        testSleep();
        var result = service.getAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Painter> getById(@PathVariable int id) {
        testSleep();
        var result = service.getById(id);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Painter> add(@RequestBody Painter painter) {
        testSleep();
        var result = service.add(painter);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Painter> update(@PathVariable int id, @RequestBody Painter painter) {
        testSleep();
        var result = service.update(id, painter);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
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
