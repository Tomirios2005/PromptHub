package org.example.prompthub.DTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class PromptRequestDTO {
    private String title;
    private String inputContext;
    private String category;

}
