// WordController.java
package com.toeicvocab.controller;

import com.toeicvocab.domain.Word;
import com.toeicvocab.dto.request.WordRequest;
import com.toeicvocab.dto.response.WordResponse;
import com.toeicvocab.service.WordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/words")
@RequiredArgsConstructor
public class WordController {

    private final WordService wordService;

    // 관리자용 단어 생성 엔드포인트
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<WordResponse> createWord(@Valid @RequestBody WordRequest wordRequest) {
        return ResponseEntity.ok(wordService.createWord(wordRequest));
    }

    // 관리자용 단어 수정 엔드포인트
    @PutMapping("/{wordId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<WordResponse> updateWord(
            @PathVariable Long wordId,
            @Valid @RequestBody WordRequest wordRequest) {
        return ResponseEntity.ok(wordService.updateWord(wordId, wordRequest));
    }

    // 관리자용 단어 삭제 엔드포인트
    @DeleteMapping("/{wordId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteWord(@PathVariable Long wordId) {
        wordService.deleteWord(wordId);
        return ResponseEntity.ok("단어가 삭제되었습니다.");
    }

    // 공용 단어 조회 엔드포인트
    @GetMapping("/public/{wordId}")
    public ResponseEntity<WordResponse> getWord(@PathVariable Long wordId) {
        return ResponseEntity.ok(wordService.getWord(wordId));
    }

    // 공용 단어장별 단어 조회 엔드포인트
    @GetMapping("/public/wordbook/{wordbookId}")
    public ResponseEntity<List<WordResponse>> getWordsByWordbook(@PathVariable Long wordbookId) {
        return ResponseEntity.ok(wordService.getWordsByWordbook(wordbookId));
    }

    // 공용 단어장 및 난이도별 단어 조회 엔드포인트
    @GetMapping("/public/wordbook/{wordbookId}/difficulty/{difficulty}")
    public ResponseEntity<List<WordResponse>> getWordsByWordbookAndDifficulty(
            @PathVariable Long wordbookId,
            @PathVariable Word.DifficultyLevel difficulty) {
        return ResponseEntity.ok(wordService.getWordsByWordbookAndDifficulty(wordbookId, difficulty));
    }

    // 관리자용 모든 단어 조회 엔드포인트
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<WordResponse>> getAllWords() {
        return ResponseEntity.ok(wordService.getAllWords());
    }
}