package com.example.paintings_app_backend.service;

import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.repository.IPaintingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
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
        given(paintingRepository.findAll()).willReturn(Arrays.asList(new Painting(), new Painting()));
        paintingService.getAll(false);
        verify(paintingRepository).findAll();
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
        Painting painting = new Painting();
        paintingService.update(1, painting);
        verify(paintingRepository).save(painting);
    }

    @Test
    public void testDelete() {
        paintingService.delete(1);
        verify(paintingRepository).deleteById(1);
    }
}
