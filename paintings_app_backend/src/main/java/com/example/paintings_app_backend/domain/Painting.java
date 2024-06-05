package com.example.paintings_app_backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "paintings")
@Data
@NoArgsConstructor
public class Painting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String name;

    String description;

    @Column(name="publicationYear")
    int year;

    @ManyToOne
    @JsonIgnore
    Painter painter;

    public int getPainterId() {
        return (painter == null) ? -1 : painter.getId();
    }

    public void setPainterId(int value) {
        if (value < 0) {
            painter = null;
        }
        else {
            painter = new Painter();
            painter.setId(value);
        }
    }

    public Painting(String name, String description, int year, int painterId) {
        this.name = name;
        this.description = description;
        this.year = year;
        setPainterId(painterId);
    }
}
