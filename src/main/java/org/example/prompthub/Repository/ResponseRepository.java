package org.example.prompthub.Repository;

import org.example.prompthub.Domain.PromptResponse;
import org.example.prompthub.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResponseRepository extends JpaRepository<PromptResponse,Long> {

    List<PromptResponse> findByUser(User user);
}
