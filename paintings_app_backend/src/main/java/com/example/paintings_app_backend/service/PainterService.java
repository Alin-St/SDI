package com.example.paintings_app_backend.service;

import com.example.paintings_app_backend.domain.Painter;
import com.example.paintings_app_backend.repository.IPainterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PainterService {
    final IPainterRepository repository;

    @Autowired
    public PainterService(IPainterRepository repository) {
        this.repository = repository;
    }

    public List<Painter> getAll() {
        return repository.findAll();
    }

    public Optional<Painter> getById(int id) {
        return repository.findById(id);
    }

    public Painter add(Painter painter) {
        if (painter.getId() != 0)
            throw new IllegalArgumentException("Id must be 0 for new entity");
        return repository.save(painter);
    }

    public Painter update(int id, Painter painter) {
        painter.setId(id);
        return repository.save(painter);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
