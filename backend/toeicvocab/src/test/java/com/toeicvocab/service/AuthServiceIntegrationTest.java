// 실제 db에 저장하는 테스트 코드
package com.toeicvocab.service;

import com.toeicvocab.domain.Admin;
import com.toeicvocab.domain.User;
import com.toeicvocab.dto.request.SignupRequest;
import com.toeicvocab.repository.AdminRepository;
import com.toeicvocab.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test") // application-test.properties 파일 사용
public class AuthServiceIntegrationTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    // @Transactional // 테스트 후 롤백을 원하지 않으면 이 애노테이션을 제거하세요
    public void testRegisterUser() {
        // Given
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("testuser");
        signupRequest.setEmail("test@example.com");
        signupRequest.setPassword("password123");

        // When
        User savedUser = authService.registerUser(signupRequest);

        // Then
        assertNotNull(savedUser);
        assertNotNull(savedUser.getId());
        assertEquals("testuser", savedUser.getUsername());
        assertEquals("test@example.com", savedUser.getEmail());

        // 데이터베이스에서 직접 확인
        User foundUser = userRepository.findByUsername("testuser").orElse(null);
        assertNotNull(foundUser);
        assertEquals("testuser", foundUser.getUsername());
    }

    @Test
    // @Transactional // 테스트 후 롤백을 원하지 않으면 이 애노테이션을 제거하세요
    public void testCreateAdmin() {
        // Given
        String username = "admin";
        String password = "1234";

        // When - 직접 저장
        Admin admin = Admin.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .role("ADMIN")
                .build();
        Admin savedAdmin = adminRepository.save(admin);

        // Then
        assertNotNull(savedAdmin);
        assertNotNull(savedAdmin.getId());
        assertEquals("admin", savedAdmin.getUsername());
        assertEquals("ADMIN", savedAdmin.getRole()); // role 검증 추가

        // 데이터베이스에서 직접 확인
        Admin foundAdmin = adminRepository.findByUsername("admin").orElse(null);
        assertNotNull(foundAdmin);
        assertEquals("admin", foundAdmin.getUsername());
        assertEquals("ADMIN", foundAdmin.getRole()); // role 검증 추가
    }
}