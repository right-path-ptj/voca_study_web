package com.toeicvocab.dto.response;

import com.toeicvocab.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private Long userId;
    private String username;
    private int commentCount;
    private List<CommentResponse> comments;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PostResponse fromEntity(Post post, boolean includeComments) {
        PostResponseBuilder builder = PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .userId(post.getUser().getId())
                .username(post.getUser().getUsername())
                .commentCount(post.getComments() != null ? post.getComments().size() : 0)  // null 체크 추가
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt());

        if (includeComments) {
            builder.comments(post.getComments().stream()
                    .map(CommentResponse::fromEntity)
                    .collect(Collectors.toList()));
        }

        return builder.build();
    }
}