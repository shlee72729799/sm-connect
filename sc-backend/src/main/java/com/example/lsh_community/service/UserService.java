package com.example.lsh_community.service;

import com.example.lsh_community.dto.LoginRequest;
import com.example.lsh_community.dto.SignupRequest;
import com.example.lsh_community.dto.UserResponse;

public interface UserService {
    UserResponse signup(SignupRequest req);
    UserResponse login(LoginRequest req);
    
    default UserResponse toResponse(com.example.lsh_community.entity.UserEntity entity) {
        return new UserResponse(
                entity.getId(),
                entity.getUsername(),
                entity.getEmail(),
                entity.getName()
        );
    }
}

