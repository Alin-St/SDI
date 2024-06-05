package com.example.paintings_app_backend.service;

import com.example.paintings_app_backend.domain.Painter;
import com.example.paintings_app_backend.domain.Painting;
import com.example.paintings_app_backend.repository.IPainterRepository;
import com.example.paintings_app_backend.repository.IPaintingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AppService {
    final IPaintingRepository paintingRepository;
    final IPainterRepository painterRepository;

    @Autowired
    public AppService(IPaintingRepository paintingRepository, IPainterRepository painterRepository) {
        this.paintingRepository = paintingRepository;
        this.painterRepository = painterRepository;
    }

    public void deleteAllEntities() {
        paintingRepository.deleteAll();
        painterRepository.deleteAll();
    }

    public void resetEntities() {
        deleteAllEntities();

        // Create and save 5 painters with realistic data
        var painter1 = painterRepository.save(new Painter("Vincent van Gogh"));
        var painter2 = painterRepository.save(new Painter("Pablo Picasso"));
        var painter3 = painterRepository.save(new Painter("Leonardo da Vinci"));
        var painter4 = painterRepository.save(new Painter("Claude Monet"));
        var painter5 = painterRepository.save(new Painter("Rembrandt"));

        // Create and save 10 paintings with realistic data
        paintingRepository.save(new Painting(
                "Starry Night",
                "A famous painting by Vincent van Gogh depicting a night sky.",
                1889,
                painter1.getId()
        ));

        paintingRepository.save(new Painting(
                "Guernica",
                "A mural-sized oil painting by Pablo Picasso.",
                1937,
                painter2.getId()
        ));

        paintingRepository.save(new Painting(
                "Mona Lisa",
                "A portrait painting by Leonardo da Vinci.",
                1503,
                painter3.getId()
        ));

        paintingRepository.save(new Painting(
                "Water Lilies",
                "A series of approximately 250 oil paintings by Claude Monet.",
                1920,
                painter4.getId()
        ));

        paintingRepository.save(new Painting(
                "The Night Watch",
                "A famous painting by Rembrandt depicting a city militia.",
                1642,
                painter5.getId()
        ));

        paintingRepository.save(new Painting(
                "Irises",
                "A painting of irises by Vincent van Gogh.",
                1889,
                painter1.getId()
        ));

        paintingRepository.save(new Painting(
                "The Weeping Woman",
                "An oil painting by Pablo Picasso.",
                1937,
                painter2.getId()
        ));

        paintingRepository.save(new Painting(
                "The Last Supper",
                "A late 15th-century mural painting by Leonardo da Vinci.",
                1498,
                painter3.getId()
        ));

        paintingRepository.save(new Painting(
                "The Hay Wain",
                "A painting by John Constable showing a rural scene on the River Stour.",
                1821,
                -1
        ));

        paintingRepository.save(new Painting(
                "The Persistence of Memory",
                "A famous painting by Salvador Dalí showing melting clocks.",
                1931,
                -1
        ));
    }
}
