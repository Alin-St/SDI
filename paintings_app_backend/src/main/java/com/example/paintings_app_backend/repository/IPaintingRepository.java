package com.example.paintings_app_backend.repository;

import com.example.paintings_app_backend.domain.Painting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPaintingRepository extends JpaRepository<Painting, Integer> {
}
