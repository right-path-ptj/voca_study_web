package com.toeicvocab.repository;

import com.toeicvocab.domain.Word;
import com.toeicvocab.domain.Wordbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    List<Word> findByWordbook(Wordbook wordbook); // 단어장에 속한 단어 목록 찾기

    List<Word> findByWordbookAndDifficultyLevel(Wordbook wordbook, Word.DifficultyLevel difficultyLevel); // 단어장과 난이도로 단어 찾기

    List<Word> findByDifficultyLevel(Word.DifficultyLevel difficultyLevel); // 난이도별 단어 목록 찾기
}
