package com.example.paintings_app_backend.service;

import com.example.paintings_app_backend.domain.Painter;
import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.repository.IPainterRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

public class PainterServiceTest {
    private final IPainterRepository painterRepository = Mockito.mock(IPainterRepository.class);
    private PainterService painterService;

    @BeforeEach
    public void setup() {
        painterService = new PainterService(painterRepository);
    }

    @Test
    public void testGetAll() {
        var painters = Arrays.asList(new Painter("p1"), new Painter("p2"));
        given(painterRepository.findAll()).willReturn(painters);

        // Get all painters
        var result = painterService.getAll();
        verify(painterRepository).findAll();
        assert(Objects.equals(result.get(0).getName(), "p1") && Objects.equals(result.get(1).getName(), "p2"));
    }

    @Test
    public void testGetById() {
        given(painterRepository.findById(1)).willReturn(Optional.of(new Painter()));
        painterService.getById(1);
        verify(painterRepository).findById(1);
    }

    @Test
    public void testAdd() {
        Painter painter = new Painter();
        painterService.add(painter);
        verify(painterRepository).save(painter);
    }

    @Test
    public void testUpdate() {
        given(painterRepository.findById(1)).willReturn(Optional.of(new Painter()));
        Painter painter = new Painter();
        painterService.update(1, painter);
        verify(painterRepository).save(painter);
    }

    @Test
    public void testDelete() {
        var painter = new Painter();
        painter.setPaintings(List.of());
        given(painterRepository.findById(1)).willReturn(Optional.of(painter));
        painterService.delete(1);
        verify(painterRepository).deleteById(1);
    }

    @Test
    public void testDeleteIntegrityConstraint() {
        var painter = new Painter();
        painter.setPaintings(List.of(new Painting()));
        given(painterRepository.findById(1)).willReturn(Optional.of(painter));

        // Check that an exception is thrown when trying to delete a painter with paintings
        try {
            painterService.delete(1);
            assert(false);
        } catch (ResponseStatusException e) {
            assert(e.getStatusCode().equals(HttpStatus.CONFLICT));
        }
    }
}
