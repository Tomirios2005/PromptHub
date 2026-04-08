package org.example.prompthub.Controller;

import lombok.RequiredArgsConstructor;
import org.example.prompthub.DTO.PromptResponseDTO;
import org.example.prompthub.Domain.User;
import org.example.prompthub.Service.ResponseService;
import org.example.prompthub.Service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/responses")
@RequiredArgsConstructor
public class ResponseController {
    private final ResponseService service;
    private final UserService userService;


    @GetMapping
    public List<PromptResponseDTO> getResponses(Authentication authentication){
        String email = (String) authentication.getPrincipal();
        User user = userService.getUserByEmail(email);
        return this.service.getResponsesByUser(user);

    }
    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable Long id, Authentication authentication){
        String email = (String) authentication.getPrincipal();
        User user = userService.getUserByEmail(email);
        if (user!=null)
            return this.service.delete(id);
        return false;
    }


}
