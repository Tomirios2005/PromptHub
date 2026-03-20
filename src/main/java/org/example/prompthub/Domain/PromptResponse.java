package org.example.prompthub.Domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromptResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String modelName;
    @Column(columnDefinition = "TEXT")
    private String outputContent;
    @ManyToOne
    @JoinColumn(name = "prompt_id")
    private Prompt prompt;
}
