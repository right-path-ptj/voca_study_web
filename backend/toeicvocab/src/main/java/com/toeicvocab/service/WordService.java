package com.toeicvocab.service;

import com.toeicvocab.domain.Word;
import com.toeicvocab.domain.Wordbook;
import com.toeicvocab.dto.request.WordRequest;
import com.toeicvocab.dto.response.WordResponse;
import com.toeicvocab.repository.WordRepository;
import com.toeicvocab.repository.WordbookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;
    private final WordbookRepository wordbookRepository;

    // 단어 생성
    @Transactional
    public WordResponse createWord(WordRequest wordRequest) {
        Wordbook wordbook = wordbookRepository.findById(wordRequest.getWordbookId())
                .orElseThrow(() -> new RuntimeException("단어장을 찾을 수 없습니다: " + wordRequest.getWordbookId()));

        Word word = Word.builder()
                .word(wordRequest.getWord())
                .meaning(wordRequest.getMeaning())
                .example(wordRequest.getExample())
                .difficultyLevel(wordRequest.getDifficultyLevel())
                .wordbook(wordbook)
                .build();

        Word savedWord = wordRepository.save(word);
        return WordResponse.fromEntity(savedWord);
    }

    // 단어 수정
    @Transactional
    public WordResponse updateWord(Long wordId, WordRequest wordRequest) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new RuntimeException("단어를 찾을 수 없습니다: " + wordId));

        Wordbook wordbook = wordbookRepository.findById(wordRequest.getWordbookId())
                .orElseThrow(() -> new RuntimeException("단어장을 찾을 수 없습니다: " + wordRequest.getWordbookId()));

        word.setWord(wordRequest.getWord());
        word.setMeaning(wordRequest.getMeaning());
        word.setExample(wordRequest.getExample());
        word.setDifficultyLevel(wordRequest.getDifficultyLevel());
        word.setWordbook(wordbook);

        Word updatedWord = wordRepository.save(word);
        return WordResponse.fromEntity(updatedWord);
    }

    // 단어 삭제
    @Transactional
    public void deleteWord(Long wordId) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new RuntimeException("단어를 찾을 수 없습니다: " + wordId));

        wordRepository.delete(word);
    }

    // 단어 조회
    @Transactional(readOnly = true)
    public WordResponse getWord(Long wordId) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new RuntimeException("단어를 찾을 수 없습니다: " + wordId));

        return WordResponse.fromEntity(word);
    }

    // 단어장에 속한 모든 단어 조회
    @Transactional(readOnly = true)
    public List<WordResponse> getWordsByWordbook(Long wordbookId) {
        Wordbook wordbook = wordbookRepository.findById(wordbookId)
                .orElseThrow(() -> new RuntimeException("단어장을 찾을 수 없습니다: " + wordbookId));

        return wordRepository.findByWordbook(wordbook).stream()
                .map(WordResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // 단어장과 난이도로 단어 조회
    @Transactional(readOnly = true)
    public List<WordResponse> getWordsByWordbookAndDifficulty(Long wordbookId, Word.DifficultyLevel difficultyLevel) {
        Wordbook wordbook = wordbookRepository.findById(wordbookId)
                .orElseThrow(() -> new RuntimeException("단어장을 찾을 수 없습니다: " + wordbookId));

        return wordRepository.findByWordbookAndDifficultyLevel(wordbook, difficultyLevel).stream()
                .map(WordResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // 모든 단어 조회
    @Transactional(readOnly = true)
    public List<WordResponse> getAllWords() {
        return wordRepository.findAll().stream()
                .map(WordResponse::fromEntity)
                .collect(Collectors.toList());
    }
}