package com.toeicvocab.dto.request;

import com.toeicvocab.domain.Word;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WordRequest {
    @NotBlank(message = "단어는 필수입니다.")
    private String word;

    @NotBlank(message = "의미는 필수입니다.")
    private String meaning;

    private String example;

    @NotNull(message = "난이도는 필수입니다.")
    private Word.DifficultyLevel difficultyLevel;

    @NotNull(message = "단어장 ID는 필수입니다.")
    private Long wordbookId;
}
