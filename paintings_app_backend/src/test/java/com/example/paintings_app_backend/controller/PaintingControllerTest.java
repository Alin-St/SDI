package com.example.paintings_app_backend.controller;

import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.service.PaintingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PaintingControllerTest {
    private final PaintingService paintingService = Mockito.mock(PaintingService.class);
    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        PaintingController paintingController = new PaintingController(paintingService);
        mockMvc = MockMvcBuilders.standaloneSetup(paintingController).build();
    }

    @Test
    public void testGetAll() throws Exception {
        given(paintingService.getAll(false)).willReturn(Arrays.asList(new Painting(), new Painting()));
        mockMvc.perform(get("/api/paintings"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetById() throws Exception {
        given(paintingService.getById(1)).willReturn(Optional.of(new Painting()));
        mockMvc.perform(get("/api/paintings/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void testAdd() throws Exception {
        mockMvc.perform(post("/api/paintings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"painting 1\",\"description\":\"description 1\",\"publicationYear\":1001}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testUpdate() throws Exception {
        mockMvc.perform(put("/api/paintings/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"painting 1\",\"description\":\"description 1\",\"publicationYear\":1001}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testDelete() throws Exception {
        mockMvc.perform(delete("/api/paintings/1"))
                .andExpect(status().isOk());
    }
}
