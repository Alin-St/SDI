package com.example.paintings_app_backend.service;

import com.example.paintings_app_backend.domain.Painter;
import com.example.paintings_app_backend.repository.IPainterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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

    public Painter getById(int id) {
        var result = repository.findById(id);
        if (result.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Painter not found");
        return result.get();
    }

    public Painter add(Painter painter) {
        if (painter.getId() != 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id must be 0 for new entity");
        return repository.save(painter);
    }

    public Painter update(int id, Painter painter) {
        if (repository.findById(id).isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Painter not found");
        painter.setId(id);
        return repository.save(painter);
    }

    public void delete(int id) {
        var painter = repository.findById(id);
        if (painter.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Painter not found");
        if (!painter.get().getPaintings().isEmpty())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Painter is referenced in a painting.");
        repository.deleteById(id);
    }
}
