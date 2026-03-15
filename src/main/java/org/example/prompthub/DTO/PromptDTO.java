package org.example.prompthub.DTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class PromptDTO {
    private Long id;
    private String inputContext;
    private LocalDateTime createdAt;
    private List<PromptResponseDTO> responses;
}
