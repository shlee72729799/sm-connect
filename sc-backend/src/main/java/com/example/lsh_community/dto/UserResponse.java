package com.example.lsh_community.dto;

public record UserResponse(
        Long id,
        String username,
        String email,
        String name
) {}

