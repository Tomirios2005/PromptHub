package org.example.prompthub.Controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.prompthub.DTO.PromptDTO;
import org.example.prompthub.DTO.PromptRequestDTO;
import org.example.prompthub.DTO.PromptResponseDTO;
import org.example.prompthub.Domain.User;
import org.example.prompthub.Service.PromptService;
import org.example.prompthub.Service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/prompts")
@RequiredArgsConstructor
public class PromptController {
    private final PromptService promptService;
    private final UserService userService;
    @GetMapping
    public List<PromptDTO> getPrompts(Authentication authentication){
        String email = (String) authentication.getPrincipal();
        User user = userService.getUserByEmail(email);
        return promptService.findByUser(user);    }
    @GetMapping("/{id}")
    public PromptDTO getPromptById(@PathVariable Long id){
        return this.promptService.getPromptById(id);
    }
    @PostMapping
    public PromptDTO createPrompt(@RequestBody PromptRequestDTO prompt, Authentication authentication){
        String email = (String) authentication.getPrincipal();
        User user = userService.getUserByEmail(email);
        PromptDTO tmp=this.promptService.existsByPromptAndUser(prompt, user);
        if (tmp!=null){
            return tmp;
        }
        return this.promptService.createPrompt(prompt, user);
    }
    @PutMapping("/{id}")
    public PromptDTO updatePrompt(@PathVariable long id, @RequestBody PromptRequestDTO prompt){
        return this.promptService.updatePrompt(id, prompt);
    }
    @DeleteMapping("/{id}")
    public boolean deletePrompt(@PathVariable long id){
        return this.promptService.delete(id);
    }
    @GetMapping("/{id}/generate")
    public PromptResponseDTO getResponse(@PathVariable long id, @RequestParam String modelName  ){
        return this.promptService.getResponse(id, modelName);
    }



}
