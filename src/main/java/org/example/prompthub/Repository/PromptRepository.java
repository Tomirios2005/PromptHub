package org.example.prompthub.Repository;

import org.example.prompthub.DTO.PromptDTO;
import org.example.prompthub.Domain.Prompt;
import org.example.prompthub.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromptRepository extends JpaRepository<Prompt,Long> {


    List<Prompt> findByUser(User user);

    boolean existsByInputContextAndUser(String inputContext, User user);

    Prompt findByInputContextAndUser(String inputContext, User user);
}
