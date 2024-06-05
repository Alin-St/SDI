package com.example.paintings_app_backend.service;

import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.repository.IPaintingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

public class PaintingServiceTest {
    private final IPaintingRepository paintingRepository = Mockito.mock(IPaintingRepository.class);
    private PaintingService paintingService;

    @BeforeEach
    public void setup() {
        paintingService = new PaintingService(paintingRepository);
    }

    @Test
    public void testGetAll() {
        var paintings = Arrays.asList(new Painting("p1", null, 0, -1), new Painting("p2", null, 0, -1));
        given(paintingRepository.findAll()).willReturn(paintings);

        // Get all paintings in ascending order
        var result = paintingService.getAll(false);
        verify(paintingRepository).findAll();
        assert(Objects.equals(result.get(0).getName(), "p1") && Objects.equals(result.get(1).getName(), "p2"));

        // Get all paintings in descending order
        result = paintingService.getAll(true);
        assert(Objects.equals(result.get(0).getName(), "p2") && Objects.equals(result.get(1).getName(), "p1"));
    }

    @Test
    public void testGetById() {
        given(paintingRepository.findById(1)).willReturn(Optional.of(new Painting()));
        paintingService.getById(1);
        verify(paintingRepository).findById(1);
    }

    @Test
    public void testAdd() {
        Painting painting = new Painting();
        paintingService.add(painting);
        verify(paintingRepository).save(painting);
    }

    @Test
    public void testUpdate() {
        given(paintingRepository.findById(1)).willReturn(Optional.of(new Painting()));
        Painting painting = new Painting();
        paintingService.update(1, painting);
        verify(paintingRepository).save(painting);
    }

    @Test
    public void testDelete() {
        given(paintingRepository.findById(1)).willReturn(Optional.of(new Painting()));
        paintingService.delete(1);
        verify(paintingRepository).deleteById(1);
    }
}
