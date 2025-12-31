package com.toeicvocab.service;

import com.toeicvocab.domain.Admin;
import com.toeicvocab.domain.User;
import com.toeicvocab.dto.request.LoginRequest;
import com.toeicvocab.dto.request.SignupRequest;
import com.toeicvocab.dto.response.LoginResponse;
import com.toeicvocab.repository.AdminRepository;
import com.toeicvocab.repository.UserRepository;
import com.toeicvocab.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    // 일반 사용자 회원가입
    @Transactional
    public User registerUser(SignupRequest signupRequest) {
        // 사용자 이름 중복 확인
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new RuntimeException("이미 사용 중인 사용자 이름입니다.");
        }

        // 이메일 중복 확인
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("이미 사용 중인 이메일입니다.");
        }

        // 사용자 엔티티 생성 및 저장
        User user = User.builder()
                .username(signupRequest.getUsername())
                .email(signupRequest.getEmail())
                .role("USER")
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .build();

        return userRepository.save(user);
    }

    // 관리자 로그인
    @Transactional(readOnly = true)
    public LoginResponse authenticateAdmin(LoginRequest loginRequest) {
        Admin admin = adminRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("관리자 정보를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(loginRequest.getPassword(), admin.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String jwt = tokenProvider.generateToken(admin.getUsername());

        return LoginResponse.builder()
                .accessToken(jwt)
                .tokenType("Bearer")
                .username(admin.getUsername())
                .isAdmin(true)
                .build();
    }

    // 일반 사용자 로그인
    @Transactional(readOnly = true)
    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(loginRequest.getUsername());

        // 관리자 확인
        boolean isAdmin = adminRepository.existsByUsername(loginRequest.getUsername());

        return LoginResponse.builder()
                .accessToken(jwt)
                .tokenType("Bearer")
                .username(loginRequest.getUsername())
                .isAdmin(isAdmin)
                .build();
    }
}