package com.example.paintings_app_backend.service;

import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.repository.IPaintingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class PaintingService {
    final IPaintingRepository repository;

    @Autowired
    public PaintingService(IPaintingRepository repository) {
        this.repository = repository;
    }

    public List<Painting> getAll(boolean desc) {
        var paintings = repository.findAll();
        paintings.sort((p1, p2) -> desc ? p2.getName().compareTo(p1.getName()) : p1.getName().compareTo(p2.getName()));
        return paintings;
    }

    public Painting getById(int id) {
        var result = repository.findById(id);
        if (result.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Painting not found");
        return result.get();
    }

    public Painting add(Painting painting) {
        if (painting.getId() != 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id must be 0 for new entity");
        return repository.save(painting);
    }

    public Painting update(int id, Painting painting) {
        if (repository.findById(id).isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Painting not found");
        painting.setId(id);
        return repository.save(painting);
    }

    public void delete(int id) {
        if (repository.findById(id).isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Painting not found");
        repository.deleteById(id);
    }
}
