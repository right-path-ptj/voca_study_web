package com.toeicvocab.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequest {
    @NotBlank(message = "내용은 필수입니다.")
    private String content;

    @NotNull(message = "게시글 ID는 필수입니다.")
    private Long postId;
}
