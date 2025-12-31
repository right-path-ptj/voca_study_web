// WordbookController.java
package com.toeicvocab.controller;

import com.toeicvocab.dto.response.WordbookResponse;
import com.toeicvocab.service.WordbookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wordbooks")
@RequiredArgsConstructor
public class WordbookController {

    private final WordbookService wordbookService;

    // 관리자용 단어장 생성 엔드포인트
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<WordbookResponse> createWordbook(
            @RequestParam String title,
            @RequestParam(required = false) String description) {
        return ResponseEntity.ok(wordbookService.createWordbook(title, description));
    }

    // 관리자용 단어장 수정 엔드포인트
    @PutMapping("/{wordbookId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<WordbookResponse> updateWordbook(
            @PathVariable Long wordbookId,
            @RequestParam String title,
            @RequestParam(required = false) String description) {
        return ResponseEntity.ok(wordbookService.updateWordbook(wordbookId, title, description));
    }

    // 관리자용 단어장 삭제 엔드포인트
    @DeleteMapping("/{wordbookId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteWordbook(@PathVariable Long wordbookId) {
        wordbookService.deleteWordbook(wordbookId);
        return ResponseEntity.ok("단어장이 삭제되었습니다.");
    }

    // 단어장 조회 엔드포인트
    @GetMapping("/{wordbookId}")
    public ResponseEntity<WordbookResponse> getWordbook(
            @PathVariable Long wordbookId,
            @RequestParam(defaultValue = "false") boolean includeWords) {
        return ResponseEntity.ok(wordbookService.getWordbook(wordbookId, includeWords));
    }

    // 모든 단어장 조회 엔드포인트
    @GetMapping
    public ResponseEntity<List<WordbookResponse>> getAllWordbooks() {
        return ResponseEntity.ok(wordbookService.getAllWordbooks());
    }
}