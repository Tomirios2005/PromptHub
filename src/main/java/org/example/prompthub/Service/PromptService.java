package org.example.prompthub.Service;

import lombok.RequiredArgsConstructor;
import org.example.prompthub.DTO.PromptDTO;
import org.example.prompthub.DTO.PromptRequestDTO;
import org.example.prompthub.DTO.PromptResponseDTO;
import org.example.prompthub.Domain.Prompt;
import org.example.prompthub.Domain.PromptResponse;
import org.example.prompthub.Repository.PromptRepository;
import org.example.prompthub.Repository.ResponseRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PromptService {
    private final PromptRepository repository;
    private final RestTemplate restTemplate;
    private final ResponseService responseService;
    @Value("${groq.api.key}")
    private String apiKey;
    public List<PromptDTO> getPrompts() {
        // Usamos streams para transformar toda la lista en una sola línea
        return repository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    public PromptDTO getPromptById(Long id) {
        return convertToDTO(repository.findById(id).orElseThrow());
    }

    public PromptDTO convertToDTO(Prompt prompt) {
        PromptDTO dto = new PromptDTO();
        dto.setId(prompt.getId());
        dto.setInputContext(prompt.getInputContext());
        dto.setCreatedAt(prompt.getCreatedAt());

        // Convertimos la lista de respuestas de Entidad a DTO
        if (prompt.getResponses() != null) {
            dto.setResponses(prompt.getResponses().stream()
                    .map(responseService::convertResponseToDTO)
                    .collect(Collectors.toList()));
        }
        return dto;
    }
    public PromptDTO createPrompt(PromptRequestDTO promptRequestDTO) {
        Prompt temp=new Prompt();
        temp.setInputContext(promptRequestDTO.getInputContext());
        repository.save(temp);
        return convertToDTO(temp);
    }



    public PromptDTO updatePrompt(Long id, PromptRequestDTO prompt) {
        try {
            Prompt tmp=this.repository.findById(id).orElseThrow();
            tmp.setInputContext(prompt.getInputContext());
            repository.save(tmp);
            return convertToDTO(tmp);
        }catch (Exception e){
            return null;
        }
    }
    public boolean delete(Long id){
        try {
            this.repository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
    public long exists(PromptRequestDTO prompt){
        List<Prompt> prompts=repository.findAll();
        for (Prompt p:prompts){
            if (p.getInputContext()!=null&&prompt.getInputContext()!=null) {
                if (p.getInputContext().equals(prompt.getInputContext())) {
                    System.out.println("Prompt already exists");
                    return p.getId();
                }
            }
        }
        return -1;
    }

    public PromptResponseDTO getResponse(long id, String model) {
        Prompt prompt = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prompt no encontrado"));

        // 2. Llamada lógica a la API (Simulación de la estructura de petición)
        // Aquí usarías RestTemplate o WebClient para hacer el POST a https://api.openai.com/v1/chat/completions
        String aiOutput = callExternalAI(prompt.getInputContext(), model);

        // 3. Crear y guardar la entidad [cite: 27]
        PromptResponse response = PromptResponse.builder()
                .modelName(model)
                .outputContent(aiOutput)
                .prompt(prompt)
                .build();

        // El repositorio de respuestas lo guarda en MySQL [cite: 29]
        //
        //
        return responseService.saveResponse(response);
    }

    private String callExternalAI(String userPrompt, String model) {
        String url = "https://api.groq.com/openai/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", List.of(Map.of("role", "user", "content", userPrompt)));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            // Usamos la clase de Spring Framework
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            List choices = (List) response.getBody().get("choices");
            Map firstChoice = (Map) choices.get(0);
            Map message = (Map) firstChoice.get("message");

            return (String) message.get("content");
        } catch (Exception e) {
            return "Error al llamar a la IA: " + e.getMessage();
        }
    }
}
