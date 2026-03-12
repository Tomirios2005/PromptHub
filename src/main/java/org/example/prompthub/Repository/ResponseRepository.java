package org.example.prompthub.Repository;

import org.example.prompthub.Domain.PromptResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseRepository extends JpaRepository<PromptResponse,Long> {

}
