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
import com.toeicvocab.util.TestScoreCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestResultRepository testResultRepository;
    private final UserRepository userRepository;
    private final WordbookRepository wordbookRepository;
    private final WordRepository wordRepository;
    private final TestScoreCalculator testScoreCalculator;

    // 테스트 결과 저장
    @Transactional
    public TestResultResponse saveTestResult(String username, Long wordbookId, Integer correctCount, Integer totalCount) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + username));

        Wordbook wordbook = wordbookRepository.findById(wordbookId)
                .orElseThrow(() -> new RuntimeException("단어장을 찾을 수 없습니다: " + wordbookId));

        // 점수 계산
        Integer score = testScoreCalculator.calculateScore(correctCount);

        TestResult testResult = TestResult.builder()
                .user(user)
                .wordbook(wordbook)
                .correctCount(correctCount)
                .totalCount(totalCount)
                .score(score)
                .build();

        TestResult savedTestResult = testResultRepository.save(testResult);
        return TestResultResponse.fromEntity(savedTestResult);
    }

    // 사용자의 모든 테스트 결과 조회
    @Transactional(readOnly = true)
    public List<TestResultResponse> getUserTestResults(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + username));

        return testResultRepository.findByUserOrderByTestDateDesc(user).stream()
                .map(TestResultResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // 단어장에 있는 모든 단어 조회 (테스트용)
    @Transactional(readOnly = true)
    public List<Word> getWordsForTest(Long wordbookId) {
        Wordbook wordbook = wordbookRepository.findById(wordbookId)
                .orElseThrow(() -> new RuntimeException("단어장을 찾을 수 없습니다: " + wordbookId));

        return wordRepository.findByWordbook(wordbook);
    }
}