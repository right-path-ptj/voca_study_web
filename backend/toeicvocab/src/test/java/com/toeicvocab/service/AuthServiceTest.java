// db에 저장하는게 아닌 코드가 잘 실행되는지만 확인 욛도

//package com.toeicvocab.service;

//import com.toeicvocab.domain.User;
//import com.toeicvocab.dto.request.LoginRequest;
//import com.toeicvocab.dto.request.SignupRequest;
//import com.toeicvocab.dto.response.LoginResponse;
//import com.toeicvocab.repository.AdminRepository;
//import com.toeicvocab.repository.UserRepository;
//import com.toeicvocab.security.JwtTokenProvider;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class AuthServiceTest {
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private AdminRepository adminRepository;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @Mock
//    private JwtTokenProvider tokenProvider;
//
//    @Mock
//    private AuthenticationManager authenticationManager;
//
//    @Mock
//    private Authentication authentication;
//
//    @InjectMocks
//    private AuthService authService;
//
//    private SignupRequest signupRequest;
//    private LoginRequest loginRequest;
//    private User user;
//
//    @BeforeEach
//    void setUp() {
//        // 회원가입 요청 데이터 설정
//        signupRequest = new SignupRequest();
//        signupRequest.setUsername("testuser");
//        signupRequest.setEmail("test@example.com");
//        signupRequest.setPassword("password123");
//
//        // 로그인 요청 데이터 설정
//        loginRequest = new LoginRequest();
//        loginRequest.setUsername("testuser");
//        loginRequest.setPassword("password123");
//
//        // 사용자 엔티티 설정
//        user = User.builder()
//                .id(1L)
//                .username("testuser")
//                .email("test@example.com")
//                .password("encodedPassword")
//                .build();
//    }
//
//    @Test
//    void registerUser_Success() {
//        // Given
//        when(userRepository.existsByUsername(anyString())).thenReturn(false);
//        when(userRepository.existsByEmail(anyString())).thenReturn(false);
//        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
//        when(userRepository.save(any(User.class))).thenReturn(user);
//
//        // When
//        User result = authService.registerUser(signupRequest);
//
//        // Then
//        assertNotNull(result);
//        assertEquals("testuser", result.getUsername());
//        assertEquals("test@example.com", result.getEmail());
//        assertEquals("encodedPassword", result.getPassword());
//
//        verify(userRepository).existsByUsername("testuser");
//        verify(userRepository).existsByEmail("test@example.com");
//        verify(passwordEncoder).encode("password123");
//        verify(userRepository).save(any(User.class));
//    }
//
//    @Test
//    void registerUser_UsernameExists() {
//        // Given
//        when(userRepository.existsByUsername(anyString())).thenReturn(true);
//
//        // When & Then
//        Exception exception = assertThrows(RuntimeException.class, () -> {
//            authService.registerUser(signupRequest);
//        });
//
//        assertEquals("이미 사용 중인 사용자 이름입니다.", exception.getMessage());
//        verify(userRepository).existsByUsername("testuser");
//        verify(userRepository, never()).save(any(User.class));
//    }
//
//    @Test
//    void registerUser_EmailExists() {
//        // Given
//        when(userRepository.existsByUsername(anyString())).thenReturn(false);
//        when(userRepository.existsByEmail(anyString())).thenReturn(true);
//
//        // When & Then
//        Exception exception = assertThrows(RuntimeException.class, () -> {
//            authService.registerUser(signupRequest);
//        });
//
//        assertEquals("이미 사용 중인 이메일입니다.", exception.getMessage());
//        verify(userRepository).existsByUsername("testuser");
//        verify(userRepository).existsByEmail("test@example.com");
//        verify(userRepository, never()).save(any(User.class));
//    }
//
//    @Test
//    void authenticateUser_Success() {
//        // Given
//        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
//                .thenReturn(authentication);
//        when(tokenProvider.generateToken(anyString())).thenReturn("jwtToken");
//        when(adminRepository.existsByUsername(anyString())).thenReturn(false);
//
//        // When
//        LoginResponse result = authService.authenticateUser(loginRequest);
//
//        // Then
//        assertNotNull(result);
//        assertEquals("jwtToken", result.getAccessToken());
//        assertEquals("Bearer", result.getTokenType());
//        assertEquals("testuser", result.getUsername());
//        assertFalse(result.isAdmin());
//
//        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
//        verify(tokenProvider).generateToken("testuser");
//        verify(adminRepository).existsByUsername("testuser");
//    }
//}