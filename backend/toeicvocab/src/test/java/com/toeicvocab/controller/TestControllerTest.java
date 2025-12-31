//package com.toeicvocab.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.toeicvocab.domain.Word;
//import com.toeicvocab.dto.response.TestResultResponse;
//import com.toeicvocab.service.TestService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.MediaType;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import static org.mockito.ArgumentMatchers.anyInt;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ExtendWith(MockitoExtension.class)
//public class TestControllerTest {
//
//    @Mock
//    private TestService testService;
//
//    @InjectMocks
//    private TestController testController;
//
//    private MockMvc mockMvc;
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setUp() {
//        mockMvc = MockMvcBuilders.standaloneSetup(testController).build();
//        objectMapper = new ObjectMapper();
//
//        // 테스트를 위한 인증 정보 설정
//        Authentication auth = new UsernamePasswordAuthenticationToken("testuser", null);
//        SecurityContextHolder.getContext().setAuthentication(auth);
//    }
//
//    @Test
//    void saveTestResult_Success() throws Exception {
//        // Given
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("wordbookId", 1L);
//        requestBody.put("correctCount", 25);
//        requestBody.put("totalCount", 30);
//
//        TestResultResponse testResultResponse = TestResultResponse.builder()
//                .id(1L)
//                .userId(1L)
//                .username("testuser")
//                .wordbookId(1L)
//                .wordbookTitle("TOEIC 초급 단어장")
//                .correctCount(25)
//                .totalCount(30)
//                .correctRate(0.83)
//                .score(800)
//                .build();
//
//        when(testService.saveTestResult(anyString(), anyLong(), anyInt(), anyInt()))
//                .thenReturn(testResultResponse);
//
//        // When & Then
//        mockMvc.perform(post("/api/tests/results")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(requestBody)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.userId").value(1))
//                .andExpect(jsonPath("$.username").value("testuser"))
//                .andExpect(jsonPath("$.wordbookId").value(1))
//                .andExpect(jsonPath("$.wordbookTitle").value("TOEIC 초급 단어장"))
//                .andExpect(jsonPath("$.correctCount").value(25))
//                .andExpect(jsonPath("$.totalCount").value(30))
//                .andExpect(jsonPath("$.score").value(800));
//    }
//
//    @Test
//    void getUserTestResults_Success() throws Exception {
//        // Given
//        TestResultResponse testResult1 = TestResultResponse.builder()
//                .id(1L)
//                .userId(1L)
//                .username("testuser")
//                .wordbookId(1L)
//                .wordbookTitle("TOEIC 초급 단어장")
//                .correctCount(25)
//                .totalCount(30)
//                .correctRate(0.83)
//                .score(800)
//                .build();
//
//        TestResultResponse testResult2 = TestResultResponse.builder()
//                .id(2L)
//                .userId(1L)
//                .username("testuser")
//                .wordbookId(2L)
//                .wordbookTitle("TOEIC 중급 단어장")
//                .correctCount(18)
//                .totalCount(30)
//                .correctRate(0.6)
//                .score(700)
//                .build();
//
//        List<TestResultResponse> testResults = Arrays.asList(testResult1, testResult2);
//
//        when(testService.getUserTestResults(anyString())).thenReturn(testResults);
//
//        // When & Then
//        mockMvc.perform(get("/api/tests/results"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].id").value(1))
//                .andExpect(jsonPath("$[0].wordbookTitle").value("TOEIC 초급 단어장"))
//                .andExpect(jsonPath("$[0].score").value(800))
//                .andExpect(jsonPath("$[1].id").value(2))
//                .andExpect(jsonPath("$[1].wordbookTitle").value("TOEIC 중급 단어장"))
//                .andExpect(jsonPath("$[1].score").value(700));
//    }
//
//    @Test
//    void getWordsForTest_Success() throws Exception {
//        // Given
//        Word word1 = Word.builder()
//                .id(1L)
//                .word("apple")
//                .meaning("사과")
//                .difficultyLevel(Word.DifficultyLevel.EASY)
//                .build();
//
//        Word word2 = Word.builder()
//                .id(2L)
//                .word("banana")
//                .meaning("바나나")
//                .difficultyLevel(Word.DifficultyLevel.EASY)
//                .build();
//
//        List<Word> words = Arrays.asList(word1, word2);
//
//        when(testService.getWordsForTest(anyLong())).thenReturn(words);
//
//        // When & Then
//        mockMvc.perform(get("/api/tests/wordbook/1"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].id").value(1))
//                .andExpect(jsonPath("$[0].word").value("apple"))
//                .andExpect(jsonPath("$[0].meaning").value("사과"))
//                .andExpect(jsonPath("$[1].id").value(2))
//                .andExpect(jsonPath("$[1].word").value("banana"))
//                .andExpect(jsonPath("$[1].meaning").value("바나나"));
//    }
//}
