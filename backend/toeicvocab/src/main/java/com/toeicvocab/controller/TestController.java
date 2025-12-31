// TestController.java
package com.toeicvocab.controller;

import com.toeicvocab.domain.Word;
import com.toeicvocab.dto.response.TestResultResponse;
import com.toeicvocab.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tests")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    // 테스트 결과 저장
    @PostMapping("/results")
    public ResponseEntity<TestResultResponse> saveTestResult(
            Authentication authentication,
            @RequestBody Map<String, Object> request) {
        String username = authentication.getName();
        Long wordbookId = Long.valueOf(request.get("wordbookId").toString());
        Integer correctCount = (Integer) request.get("correctCount");
        Integer totalCount = (Integer) request.get("totalCount");

        return ResponseEntity.ok(testService.saveTestResult(username, wordbookId, correctCount, totalCount));
    }

    // 사용자 테스트 결과 조회
    @GetMapping("/results")
    public ResponseEntity<List<TestResultResponse>> getUserTestResults(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(testService.getUserTestResults(username));
    }

    // 테스트용 단어장 단어 조회
    @GetMapping("/wordbook/{wordbookId}")
    public ResponseEntity<List<Word>> getWordsForTest(@PathVariable Long wordbookId) {
        return ResponseEntity.ok(testService.getWordsForTest(wordbookId));
    }
}