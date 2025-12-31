//package com.toeicvocab.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.toeicvocab.domain.User;
//import com.toeicvocab.dto.request.LoginRequest;
//import com.toeicvocab.dto.request.SignupRequest;
//import com.toeicvocab.dto.response.LoginResponse;
//import com.toeicvocab.service.AuthService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ExtendWith(MockitoExtension.class)
//public class AuthControllerTest {
//
//    @Mock
//    private AuthService authService;
//
//    @InjectMocks
//    private AuthController authController;
//
//    private MockMvc mockMvc;
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setUp() {
//        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
//        objectMapper = new ObjectMapper();
//    }
//
//    @Test
//    void registerUser_Success() throws Exception {
//        // Given
//        SignupRequest signupRequest = new SignupRequest();
//        signupRequest.setUsername("testuser");
//        signupRequest.setEmail("test@example.com");
//        signupRequest.setPassword("password123");
//
//        User user = User.builder()
//                .id(1L)
//                .username("testuser")
//                .email("test@example.com")
//                .password("encodedPassword")
//                .build();
//
//        when(authService.registerUser(any(SignupRequest.class))).thenReturn(user);
//
//        // When & Then
//        mockMvc.perform(post("/api/auth/signup")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(signupRequest)))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void authenticateUser_Success() throws Exception {
//        // Given
//        LoginRequest loginRequest = new LoginRequest();
//        loginRequest.setUsername("testuser");
//        loginRequest.setPassword("password123");
//
//        LoginResponse loginResponse = LoginResponse.builder()
//                .accessToken("jwtToken")
//                .tokenType("Bearer")
//                .username("testuser")
//                .isAdmin(false)
//                .build();
//
//        when(authService.authenticateUser(any(LoginRequest.class))).thenReturn(loginResponse);
//
//        // When & Then
//        mockMvc.perform(post("/api/auth/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(loginRequest)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.accessToken").value("jwtToken"))
//                .andExpect(jsonPath("$.tokenType").value("Bearer"))
//                .andExpect(jsonPath("$.username").value("testuser"))
//                .andExpect(jsonPath("$.admin").value(false));
//    }
//
//    @Test
//    void authenticateAdmin_Success() throws Exception {
//        // Given
//        LoginRequest loginRequest = new LoginRequest();
//        loginRequest.setUsername("admin");
//        loginRequest.setPassword("admin123");
//
//        LoginResponse loginResponse = LoginResponse.builder()
//                .accessToken("adminJwtToken")
//                .tokenType("Bearer")
//                .username("admin")
//                .isAdmin(true)
//                .build();
//
//        when(authService.authenticateAdmin(any(LoginRequest.class))).thenReturn(loginResponse);
//
//        // When & Then
//        mockMvc.perform(post("/api/auth/admin/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(loginRequest)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.accessToken").value("adminJwtToken"))
//                .andExpect(jsonPath("$.tokenType").value("Bearer"))
//                .andExpect(jsonPath("$.username").value("admin"))
//                .andExpect(jsonPath("$.admin").value(true));
//    }
//}