package org.example.prompthub.DTO;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class PromptResponseDTO {
    private Long id;
    private String modelName;   // Ej: "GPT-4", "Claude 3.5"
    private String outputContent;
    private Integer rating;      // Tu evaluación de 1 a 5 [cite: 12]
    private String analysis;     // Tu feedback detallado
    private Long promptId;

}