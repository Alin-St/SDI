package com.example.paintings_app_backend.service;

import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.repository.IPaintingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PaintingService {
    final IPaintingRepository repository;

    @Autowired
    public PaintingService(IPaintingRepository repository) {
        this.repository = repository;
    }

    public List<Painting> getAll(boolean desc) {
        if (desc) {
            return repository.findAll(Sort.by(Sort.Direction.DESC, "name"));
        } else {
            return repository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        }
    }

    public Optional<Painting> getById(int id) {
        return repository.findById(id);
    }

    public Painting add(Painting painting) {
        if (painting.getId() != 0)
            throw new IllegalArgumentException("Id must be 0 for new entity");
        return repository.save(painting);
    }

    public Painting update(int id, Painting painting) {
        painting.setId(id);
        return repository.save(painting);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
