package org.example.prompthub.Domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "prompts")
@Data
@NoArgsConstructor
public class Prompt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT") // Para permitir textos largos
    private String inputContext;

    private String category;

    private LocalDateTime createdAt;

    // Relación con las respuestas para comparar (Chain-of-thought)
    @OneToMany(mappedBy = "prompt", cascade = CascadeType.ALL)
    private List<PromptResponse> responses;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters y Setters...
}
