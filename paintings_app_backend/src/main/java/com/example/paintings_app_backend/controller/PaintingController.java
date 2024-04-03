package com.example.paintings_app_backend.controller;

import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.service.PaintingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        return "HELLO!";
    }

    @GetMapping("")
    public List<Painting> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Painting> getById(@PathVariable int id) {
        return service.getById(id);
    }

    @PostMapping
    public void add(@RequestBody Painting painting) {
        service.add(painting);
    }

    @PutMapping
    public void update(@RequestBody Painting painting) {
        service.update(painting);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }
}
