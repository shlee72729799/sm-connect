package com.example.lsh_community.controller;

import com.example.lsh_community.dto.AuthResponse;
import com.example.lsh_community.dto.LoginRequest;
import com.example.lsh_community.dto.SignupRequest;
import com.example.lsh_community.dto.UserResponse;
import com.example.lsh_community.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest req) {
        UserResponse user = userService.signup(req);
        AuthResponse response = new AuthResponse("회원가입이 완료되었습니다", user);
        return ResponseEntity
                .created(URI.create("/api/auth/users/" + user.id()))
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        UserResponse user = userService.login(req);
        AuthResponse response = new AuthResponse("로그인 성공", user);
        return ResponseEntity.ok(response);
    }
}

