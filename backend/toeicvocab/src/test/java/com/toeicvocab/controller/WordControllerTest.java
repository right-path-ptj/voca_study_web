//package com.toeicvocab.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.toeicvocab.domain.Word;
//import com.toeicvocab.dto.request.WordRequest;
//import com.toeicvocab.dto.response.WordResponse;
//import com.toeicvocab.service.WordService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.Mockito.doNothing;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ExtendWith(MockitoExtension.class)
//public class WordControllerTest {
//
//    @Mock
//    private WordService wordService;
//
//    @InjectMocks
//    private WordController wordController;
//
//    private MockMvc mockMvc;
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setUp() {
//        mockMvc = MockMvcBuilders.standaloneSetup(wordController).build();
//        objectMapper = new ObjectMapper();
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void createWord_Success() throws Exception {
//        // Given
//        WordRequest wordRequest = new WordRequest();
//        wordRequest.setWord("apple");
//        wordRequest.setMeaning("사과");
//        wordRequest.setExample("I eat an apple every day.");
//        wordRequest.setDifficultyLevel(Word.DifficultyLevel.EASY);
//        wordRequest.setWordbookId(1L);
//
//        WordResponse wordResponse = WordResponse.builder()
//                .id(1L)
//                .word("apple")
//                .meaning("사과")
//                .example("I eat an apple every day.")
//                .difficultyLevel(Word.DifficultyLevel.EASY)
//                .wordbookId(1L)
//                .wordbookTitle("TOEIC 초급 단어장")
//                .build();
//
//        when(wordService.createWord(any(WordRequest.class))).thenReturn(wordResponse);
//
//        // When & Then
//        mockMvc.perform(post("/api/words")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(wordRequest)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.word").value("apple"))
//                .andExpect(jsonPath("$.meaning").value("사과"))
//                .andExpect(jsonPath("$.example").value("I eat an apple every day."))
//                .andExpect(jsonPath("$.difficultyLevel").value("EASY"))
//                .andExpect(jsonPath("$.wordbookId").value(1))
//                .andExpect(jsonPath("$.wordbookTitle").value("TOEIC 초급 단어장"));
//    }
//
//    @Test
//    void getWord_Success() throws Exception {
//        // Given
//        WordResponse wordResponse = WordResponse.builder()
//                .id(1L)
//                .word("apple")
//                .meaning("사과")
//                .example("I eat an apple every day.")
//                .difficultyLevel(Word.DifficultyLevel.EASY)
//                .wordbookId(1L)
//                .wordbookTitle("TOEIC 초급 단어장")
//                .build();
//
//        when(wordService.getWord(anyLong())).thenReturn(wordResponse);
//
//        // When & Then
//        mockMvc.perform(get("/api/words/public/1"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.word").value("apple"))
//                .andExpect(jsonPath("$.meaning").value("사과"))
//                .andExpect(jsonPath("$.example").value("I eat an apple every day."))
//                .andExpect(jsonPath("$.difficultyLevel").value("EASY"));
//    }
//
//    @Test
//    void getWordsByWordbook_Success() throws Exception {
//        // Given
//        WordResponse word1 = WordResponse.builder()
//                .id(1L)
//                .word("apple")
//                .meaning("사과")
//                .difficultyLevel(Word.DifficultyLevel.EASY)
//                .wordbookId(1L)
//                .build();
//
//        WordResponse word2 = WordResponse.builder()
//                .id(2L)
//                .word("banana")
//                .meaning("바나나")
//                .difficultyLevel(Word.DifficultyLevel.EASY)
//                .wordbookId(1L)
//                .build();
//
//        List<WordResponse> wordResponses = Arrays.asList(word1, word2);
//
//        when(wordService.getWordsByWordbook(anyLong())).thenReturn(wordResponses);
//
//        // When & Then
//        mockMvc.perform(get("/api/words/public/wordbook/1"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].id").value(1))
//                .andExpect(jsonPath("$[0].word").value("apple"))
//                .andExpect(jsonPath("$[1].id").value(2))
//                .andExpect(jsonPath("$[1].word").value("banana"));
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void updateWord_Success() throws Exception {
//        // Given
//        WordRequest wordRequest = new WordRequest();
//        wordRequest.setWord("updated-apple");
//        wordRequest.setMeaning("업데이트된 사과");
//        wordRequest.setExample("This is an updated example.");
//        wordRequest.setDifficultyLevel(Word.DifficultyLevel.MEDIUM);
//        wordRequest.setWordbookId(1L);
//
//        WordResponse wordResponse = WordResponse.builder()
//                .id(1L)
//                .word("updated-apple")
//                .meaning("업데이트된 사과")
//                .example("This is an updated example.")
//                .difficultyLevel(Word.DifficultyLevel.MEDIUM)
//                .wordbookId(1L)
//                .build();
//
//        when(wordService.updateWord(anyLong(), any(WordRequest.class))).thenReturn(wordResponse);
//
//        // When & Then
//        mockMvc.perform(put("/api/words/1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(wordRequest)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.word").value("updated-apple"))
//                .andExpect(jsonPath("$.meaning").value("업데이트된 사과"));
//    }
//
//    @Test
//    @WithMockUser(roles = "ADMIN")
//    void deleteWord_Success() throws Exception {
//        // Given
//        doNothing().when(wordService).deleteWord(anyLong());
//
//        // When & Then
//        mockMvc.perform(delete("/api/words/1"))
//                .andExpect(status().isOk());
//    }
//}