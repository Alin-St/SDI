package com.example.paintings_app_backend.service;

import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.repository.IPaintingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaintingService {
    final IPaintingRepository repository;

    @Autowired
    public PaintingService(IPaintingRepository repository) {
        this.repository = repository;
    }

    public List<Painting> getAll() {
        return repository.findAll();
    }

    public Optional<Painting> getById(int id) {
        return repository.findById(id);
    }

    public Painting add(Painting painting) {
        return repository.save(painting);
    }

    public Painting update(Painting painting) {
        return repository.save(painting);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
