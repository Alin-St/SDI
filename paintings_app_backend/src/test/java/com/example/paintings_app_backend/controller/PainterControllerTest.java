package com.example.paintings_app_backend.controller;

import com.example.paintings_app_backend.domain.Painter;
import com.example.paintings_app_backend.service.PainterService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PainterControllerTest {
    private final PainterService painterService = Mockito.mock(PainterService.class);
    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        PainterController painterController = new PainterController(painterService);
        mockMvc = MockMvcBuilders.standaloneSetup(painterController).build();
    }

    @Test
    public void testGetAll() throws Exception {
        given(painterService.getAll()).willReturn(Arrays.asList(new Painter(), new Painter()));
        mockMvc.perform(get("/api/painters"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetById() throws Exception {
        given(painterService.getById(1)).willReturn(new Painter());
        mockMvc.perform(get("/api/painters/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void testAdd() throws Exception {
        // Mock returning a painter with the id set to a specific value
        given(painterService.add(Mockito.any())).willAnswer(invocation -> {
            var painter = invocation.getArgument(0, Painter.class);
            painter.setId(1);
            return painter;
        });

        mockMvc.perform(post("/api/painters")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"painter 1\",\"description\":\"description 1\",\"publicationYear\":1001,\"painterId\":-1}"))
                .andExpect(status().isCreated());
    }

    @Test
    public void testUpdate() throws Exception {
        // Mock returning the updated painter
        given(painterService.update(Mockito.anyInt(), Mockito.any())).willAnswer(invocation -> invocation.getArgument(1));

        mockMvc.perform(put("/api/painters/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"painter 1\",\"description\":\"description 1\",\"publicationYear\":1001}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testDelete() throws Exception {
        mockMvc.perform(delete("/api/painters/1"))
                .andExpect(status().isNoContent());
    }
}
