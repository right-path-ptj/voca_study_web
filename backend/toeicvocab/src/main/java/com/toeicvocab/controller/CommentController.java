package com.toeicvocab.controller;

import com.toeicvocab.dto.request.CommentRequest;
import com.toeicvocab.dto.response.CommentResponse;
import com.toeicvocab.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 댓글 생성
    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            Authentication authentication,
            @Valid @RequestBody CommentRequest commentRequest) {
        String username = authentication.getName();
        return ResponseEntity.ok(commentService.createComment(username, commentRequest));
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            Authentication authentication,
            @PathVariable Long commentId) {
        String username = authentication.getName();
        commentService.deleteComment(commentId, username);
        return ResponseEntity.ok("댓글이 삭제되었습니다.");
    }

    // 게시글별 댓글 조회
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByPost(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    // 사용자별 댓글 조회
    @GetMapping("/user")
    public ResponseEntity<List<CommentResponse>> getCommentsByUser(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(commentService.getCommentsByUser(username));
    }
}