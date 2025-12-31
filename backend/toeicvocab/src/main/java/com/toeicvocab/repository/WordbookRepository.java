package com.toeicvocab.repository;

import com.toeicvocab.domain.Wordbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordbookRepository extends JpaRepository<Wordbook, Long> {
    List<Wordbook> findAllByOrderByTitleAsc(); // 제목 기준 오름차순 정렬된 단어장 목록 찾기
}
