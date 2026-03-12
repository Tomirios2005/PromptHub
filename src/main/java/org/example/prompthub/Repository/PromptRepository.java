package org.example.prompthub.Repository;

import org.example.prompthub.Domain.Prompt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromptRepository extends JpaRepository<Prompt,Long> {

}
