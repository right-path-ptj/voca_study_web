package com.toeicvocab.dto.response;

import com.toeicvocab.domain.Wordbook;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WordbookResponse {
    private Long id;
    private String title;
    private String description;
    private int wordCount;
    private List<WordResponse> words;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static WordbookResponse fromEntity(Wordbook wordbook, boolean includeWords) {
        WordbookResponseBuilder builder = WordbookResponse.builder()
                .id(wordbook.getId())
                .title(wordbook.getTitle())
                .description(wordbook.getDescription())
                .wordCount(wordbook.getWords() != null ? wordbook.getWords().size() : 0) // null 체크 추가
                .createdAt(wordbook.getCreatedAt())
                .updatedAt(wordbook.getUpdatedAt());

        if (includeWords && wordbook.getWords() != null) { // null 체크 추가
            builder.words(wordbook.getWords().stream()
                    .map(WordResponse::fromEntity)
                    .collect(Collectors.toList()));
        } else if (includeWords) {
            builder.words(Collections.emptyList()); // 빈 리스트 반환
        }

        return builder.build();
    }
}