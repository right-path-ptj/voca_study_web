package com.toeicvocab.service;

import com.toeicvocab.domain.Wordbook;
import com.toeicvocab.dto.response.WordbookResponse;
import com.toeicvocab.repository.WordbookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordbookService {

    private final WordbookRepository wordbookRepository;

    // 단어장 생성
    @Transactional
    public WordbookResponse createWordbook(String title, String description) {
        Wordbook wordbook = Wordbook.builder()
                .title(title)
                .description(description)
                .build();

        Wordbook savedWordbook = wordbookRepository.save(wordbook);
        return WordbookResponse.fromEntity(savedWordbook, false);
    }

    // 단어장 수정
    @Transactional
    public WordbookResponse updateWordbook(Long wordbookId, String title, String description) {
        Wordbook wordbook = wordbookRepository.findById(wordbookId)
                .orElseThrow(() -> new RuntimeException("단어장을 찾을 수 없습니다: " + wordbookId));

        wordbook.setTitle(title);
        wordbook.setDescription(description);

        Wordbook updatedWordbook = wordbookRepository.save(wordbook);
        return WordbookResponse.fromEntity(updatedWordbook, false);
    }

    // 단어장 삭제
    @Transactional
    public void deleteWordbook(Long wordbookId) {
        Wordbook wordbook = wordbookRepository.findById(wordbookId)
                .orElseThrow(() -> new RuntimeException("단어장을 찾을 수 없습니다: " + wordbookId));

        wordbookRepository.delete(wordbook);
    }

    // 단어장 조회
    @Transactional(readOnly = true)
    public WordbookResponse getWordbook(Long wordbookId, boolean includeWords) {
        Wordbook wordbook = wordbookRepository.findById(wordbookId)
                .orElseThrow(() -> new RuntimeException("단어장을 찾을 수 없습니다: " + wordbookId));

        return WordbookResponse.fromEntity(wordbook, includeWords);
    }

    // 모든 단어장 조회
    @Transactional(readOnly = true)
    public List<WordbookResponse> getAllWordbooks() {
        return wordbookRepository.findAllByOrderByTitleAsc().stream()
                .map(wordbook -> WordbookResponse.fromEntity(wordbook, false))
                .collect(Collectors.toList());
    }
}
