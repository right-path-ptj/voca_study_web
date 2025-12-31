package com.toeicvocab.dto.response;

import com.toeicvocab.domain.Word;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WordResponse {
    private Long id;
    private String word;
    private String meaning;
    private String example;
    private Word.DifficultyLevel difficultyLevel;
    private Long wordbookId;
    private String wordbookTitle;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static WordResponse fromEntity(Word word) {
        return WordResponse.builder()
                .id(word.getId())
                .word(word.getWord())
                .meaning(word.getMeaning())
                .example(word.getExample())
                .difficultyLevel(word.getDifficultyLevel())
                .wordbookId(word.getWordbook().getId())
                .wordbookTitle(word.getWordbook().getTitle())
                .createdAt(word.getCreatedAt())
                .updatedAt(word.getUpdatedAt())
                .build();
    }
}