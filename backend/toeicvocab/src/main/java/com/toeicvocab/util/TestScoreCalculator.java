// TestScoreCalculator.java
package com.toeicvocab.util;

import org.springframework.stereotype.Component;

@Component
public class TestScoreCalculator {

    /**
     * 테스트 정답 수에 따른 TOEIC 점수 계산
     * - 10개 미만 맞힐 경우: 600점
     * - 10~19개 맞힐 경우: 700점
     * - 20~29개 맞힐 경우: 800점
     * - 30개 이상 맞힐 경우: 900점
     *
     * @param correctCount 맞힌 문제 수
     * @return 환산된 TOEIC 점수
     */
    public Integer calculateScore(Integer correctCount) {
        if (correctCount < 10) {
            return 600;
        } else if (correctCount < 20) {
            return 700;
        } else if (correctCount < 30) {
            return 800;
        } else {
            return 900;
        }
    }
}