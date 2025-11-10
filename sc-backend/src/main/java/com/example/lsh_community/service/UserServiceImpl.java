package com.example.lsh_community.service;

import com.example.lsh_community.dto.LoginRequest;
import com.example.lsh_community.dto.SignupRequest;
import com.example.lsh_community.dto.UserResponse;
import com.example.lsh_community.entity.UserEntity;
import com.example.lsh_community.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse signup(SignupRequest req) {
        // 중복 체크
        if (userRepository.existsByUsername(req.username())) {
            throw new IllegalArgumentException("이미 사용 중인 사용자명입니다: " + req.username());
        }
        if (userRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다: " + req.email());
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(req.password());

        // 사용자 생성
        UserEntity user = UserEntity.builder()
                .username(req.username())
                .password(encodedPassword)
                .email(req.email())
                .name(req.name() != null ? req.name() : req.username())
                .build();

        UserEntity saved = userRepository.save(user);
        return toResponse(saved);
    }

    @Override
    public UserResponse login(LoginRequest req) {
        UserEntity user = userRepository.findByUsername(req.username())
                .orElseThrow(() -> new IllegalArgumentException("사용자명 또는 비밀번호가 올바르지 않습니다"));

        // 비밀번호 검증
        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            throw new IllegalArgumentException("사용자명 또는 비밀번호가 올바르지 않습니다");
        }

        return toResponse(user);
    }
}

