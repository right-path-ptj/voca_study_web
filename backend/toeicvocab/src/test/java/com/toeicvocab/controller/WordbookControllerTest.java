//package com.toeicvocab.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.toeicvocab.dto.response.WordbookResponse;
//import com.toeicvocab.service.WordbookService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.Mockito.doNothing;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ExtendWith(MockitoExtension.class)
//public class WordbookControllerTest {
//
//    @Mock
//    private WordbookService wordbookService;
//
//    @InjectMocks
//    private WordbookController wordbookController;
//
//    private MockMvc mockMvc;
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setUp() {
//        mockMvc = MockMvcBuilders.standaloneSetup(wordbookController).build();
//        objectMapper = new ObjectMapper();
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void createWordbook_Success() throws Exception {
//        // Given
//        WordbookResponse wordbookResponse = WordbookResponse.builder()
//                .id(1L)
//                .title("TOEIC 초급 단어장")
//                .description("TOEIC 시험 대비 초급 단어장")
//                .wordCount(0)
//                .build();
//
//        when(wordbookService.createWordbook(anyString(), anyString())).thenReturn(wordbookResponse);
//
//        // When & Then
//        mockMvc.perform(post("/api/wordbooks")
//                        .param("title", "TOEIC 초급 단어장")
//                        .param("description", "TOEIC 시험 대비 초급 단어장"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.title").value("TOEIC 초급 단어장"))
//                .andExpect(jsonPath("$.description").value("TOEIC 시험 대비 초급 단어장"))
//                .andExpect(jsonPath("$.wordCount").value(0));
//    }
//
//    @Test
//    void getWordbook_Success() throws Exception {
//        // Given
//        WordbookResponse wordbookResponse = WordbookResponse.builder()
//                .id(1L)
//                .title("TOEIC 초급 단어장")
//                .description("TOEIC 시험 대비 초급 단어장")
//                .wordCount(30)
//                .build();
//
//        when(wordbookService.getWordbook(anyLong(), anyBoolean())).thenReturn(wordbookResponse);
//
//        // When & Then
//        mockMvc.perform(get("/api/wordbooks/1")
//                        .param("includeWords", "false"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.title").value("TOEIC 초급 단어장"))
//                .andExpect(jsonPath("$.description").value("TOEIC 시험 대비 초급 단어장"))
//                .andExpect(jsonPath("$.wordCount").value(30));
//    }
//
//    @Test
//    void getAllWordbooks_Success() throws Exception {
//        // Given
//        WordbookResponse wordbook1 = WordbookResponse.builder()
//                .id(1L)
//                .title("TOEIC 초급 단어장")
//                .wordCount(30)
//                .build();
//
//        WordbookResponse wordbook2 = WordbookResponse.builder()
//                .id(2L)
//                .title("TOEIC 중급 단어장")
//                .wordCount(50)
//                .build();
//
//        List<WordbookResponse> wordbooks = Arrays.asList(wordbook1, wordbook2);
//
//        when(wordbookService.getAllWordbooks()).thenReturn(wordbooks);
//
//        // When & Then
//        mockMvc.perform(get("/api/wordbooks"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].id").value(1))
//                .andExpect(jsonPath("$[0].title").value("TOEIC 초급 단어장"))
//                .andExpect(jsonPath("$[0].wordCount").value(30))
//                .andExpect(jsonPath("$[1].id").value(2))
//                .andExpect(jsonPath("$[1].title").value("TOEIC 중급 단어장"))
//                .andExpect(jsonPath("$[1].wordCount").value(50));
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void updateWordbook_Success() throws Exception {
//        // Given
//        WordbookResponse wordbookResponse = WordbookResponse.builder()
//                .id(1L)
//                .title("수정된 단어장")
//                .description("설명이 수정되었습니다.")
//                .wordCount(30)
//                .build();
//
//        when(wordbookService.updateWordbook(anyLong(), anyString(), anyString())).thenReturn(wordbookResponse);
//
//        // When & Then
//        mockMvc.perform(put("/api/wordbooks/1")
//                        .param("title", "수정된 단어장")
//                        .param("description", "설명이 수정되었습니다."))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.title").value("수정된 단어장"))
//                .andExpect(jsonPath("$.description").value("설명이 수정되었습니다."));
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void deleteWordbook_Success() throws Exception {
//        // Given
//        doNothing().when(wordbookService).deleteWordbook(anyLong());
//
//        // When & Then
//        mockMvc.perform(delete("/api/wordbooks/1"))
//                .andExpect(status().isOk());
//    }
//}