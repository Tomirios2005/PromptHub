package org.example.prompthub.DTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class PromptDTO {
    private Long id;
    private String title;
    private String inputContext;
    private String category;
    private LocalDateTime createdAt;
    private List<PromptResponseDTO> responses;
}
