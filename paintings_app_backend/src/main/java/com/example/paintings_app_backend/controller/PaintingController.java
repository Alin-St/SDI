package com.example.paintings_app_backend.controller;

import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.service.PaintingService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String hello() {
        testSleep();
        return "HELLO!";
    }

    @GetMapping("")
    public List<Painting> getAll() {
        testSleep();
        //throw new Error("Test error");
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Painting> getById(@PathVariable int id) {
        testSleep();
        return service.getById(id);
    }

    @PostMapping
    public void add(@RequestBody Painting painting) {
        testSleep();
        service.add(painting);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable int id, @RequestBody Painting painting) {
        testSleep();
        service.update(id, painting);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        testSleep();
        service.delete(id);
    }

    void testSleep() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
