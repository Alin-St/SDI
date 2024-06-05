package com.example.paintings_app_backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "painters")
@Data
@NoArgsConstructor
public class Painter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String name;

    @OneToMany(mappedBy = "painter")
    @JsonIgnore
    List<Painting> paintings;

    public Painter(String name) {
        this.name = name;
    }
}
