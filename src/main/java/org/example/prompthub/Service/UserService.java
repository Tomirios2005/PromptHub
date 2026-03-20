package org.example.prompthub.Service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.prompthub.Domain.User;
import org.example.prompthub.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email).orElse(null);
    }


}
