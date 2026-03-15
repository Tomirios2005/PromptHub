package org.example.prompthub.Controller;

import lombok.RequiredArgsConstructor;
import org.example.prompthub.DTO.PromptResponseDTO;
import org.example.prompthub.Service.ResponseService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/responses")
@RequiredArgsConstructor
public class ResponseController {
    private final ResponseService service;


    @GetMapping
    public List<PromptResponseDTO> getResponses(){
        return this.service.getResponses();

    }
    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable Long id){
        return this.service.delete(id);
    }


}
