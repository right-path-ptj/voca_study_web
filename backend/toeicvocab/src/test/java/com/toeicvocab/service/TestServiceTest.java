package com.toeicvocab.service;

import com.toeicvocab.domain.TestResult;
import com.toeicvocab.domain.User;
import com.toeicvocab.domain.Word;
import com.toeicvocab.domain.Wordbook;
import com.toeicvocab.dto.response.TestResultResponse;
import com.toeicvocab.repository.TestResultRepository;
import com.toeicvocab.repository.UserRepository;
import com.toeicvocab.repository.WordRepository;
import com.toeicvocab.repository.WordbookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TestServiceTest {

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WordbookRepository wordbookRepository;

    @Autowired
    private WordRepository wordRepository;

    @Autowired
    private TestService testService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User user;
    private Wordbook wordbook;

    @BeforeEach
    void setUp() {
        // 사용자 생성 및 저장
        user = User.builder()
                .username("user1")
                .email("user1@example.com")
                .password(passwordEncoder.encode("1234"))
                .build();
        user = userRepository.save(user);

        // 단어장 생성 및 저장
        wordbook = Wordbook.builder()
                .title("TOEIC 초급 단어장")
                .description("TOEIC 시험 대비 초급 단어장")
                .build();
        wordbook = wordbookRepository.save(wordbook);

        // 테스트용 단어 생성 및 저장
        Word word1 = Word.builder()
                .word("apple")
                .meaning("사과")
                .example("I eat an apple every day.")
                .difficultyLevel(Word.DifficultyLevel.EASY)
                .wordbook(wordbook)
                .build();
        wordRepository.save(word1);

        Word word2 = Word.builder()
                .word("banana")
                .meaning("바나나")
                .example("Monkeys like to eat bananas.")
                .difficultyLevel(Word.DifficultyLevel.EASY)
                .wordbook(wordbook)
                .build();
        wordRepository.save(word2);
    }

    @Test
    void saveTestResult_Success() {
        // When
        TestResultResponse result = testService.saveTestResult(
                user.getUsername(), wordbook.getId(), 25, 30);

        // Then
        assertNotNull(result);
        assertEquals(25, result.getCorrectCount());
        assertEquals(30, result.getTotalCount());
        assertTrue(result.getScore() > 0); // 점수 계산은 TestScoreCalculator에 의존
        assertEquals(user.getUsername(), result.getUsername());
        assertEquals(wordbook.getTitle(), result.getWordbookTitle());

        // 데이터베이스에서 결과 확인
        List<TestResult> savedResults = testResultRepository.findByUserOrderByTestDateDesc(user);
        assertFalse(savedResults.isEmpty());
        assertEquals(25, savedResults.get(0).getCorrectCount());
        assertEquals(30, savedResults.get(0).getTotalCount());
    }

    @Test
    void getUserTestResults_Success() {
        // Given: 테스트 결과 저장
        testService.saveTestResult(user.getUsername(), wordbook.getId(), 25, 30);
        testService.saveTestResult(user.getUsername(), wordbook.getId(), 27, 30);

        // When
        List<TestResultResponse> results = testService.getUserTestResults(user.getUsername());

        // Then
        assertNotNull(results);
        assertEquals(2, results.size());
        // 최신 결과가 먼저 나오는지 확인 (내림차순)
        assertEquals(27, results.get(0).getCorrectCount());
        assertEquals(25, results.get(1).getCorrectCount());
    }

    @Test
    void getWordsForTest_Success() {
        // When
        List<Word> result = testService.getWordsForTest(wordbook.getId());

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());

        // 데이터베이스에서 단어 조회 확인
        boolean foundApple = false;
        boolean foundBanana = false;

        for (Word word : result) {
            if (word.getWord().equals("apple")) foundApple = true;
            if (word.getWord().equals("banana")) foundBanana = true;
        }

        assertTrue(foundApple);
        assertTrue(foundBanana);
    }
}