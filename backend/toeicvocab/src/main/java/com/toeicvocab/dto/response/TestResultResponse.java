package com.toeicvocab.dto.response;

import com.toeicvocab.domain.TestResult;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestResultResponse {
    private Long id;
    private Long userId;
    private String username;
    private Long wordbookId;
    private String wordbookTitle;
    private Integer correctCount;
    private Integer totalCount;
    private Double correctRate;
    private Integer score;
    private LocalDateTime testDate;

    public static TestResultResponse fromEntity(TestResult testResult) {
        return TestResultResponse.builder()
                .id(testResult.getId())
                .userId(testResult.getUser().getId())
                .username(testResult.getUser().getUsername())
                .wordbookId(testResult.getWordbook().getId())
                .wordbookTitle(testResult.getWordbook().getTitle())
                .correctCount(testResult.getCorrectCount())
                .totalCount(testResult.getTotalCount())
                .correctRate((double) testResult.getCorrectCount() / testResult.getTotalCount())
                .score(testResult.getScore())
                .testDate(testResult.getTestDate())
                .build();
    }
}
