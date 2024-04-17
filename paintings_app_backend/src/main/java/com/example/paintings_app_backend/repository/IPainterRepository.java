package com.example.paintings_app_backend.repository;

import com.example.paintings_app_backend.domain.Painter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPainterRepository extends JpaRepository<Painter, Integer> {
}
