package com.toeicvocab.repository;

import com.toeicvocab.domain.TestResult;
import com.toeicvocab.domain.User;
import com.toeicvocab.domain.Wordbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    List<TestResult> findByUserOrderByTestDateDesc(User user); // 사용자 테스트 결과 최신순 조회

    List<TestResult> findByUserAndWordbookOrderByTestDateDesc(User user, Wordbook wordbook); // 사용자와 단어장별 테스트 결과 조회
}