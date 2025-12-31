package com.toeicvocab.controller;

import com.toeicvocab.dto.request.PostRequest;
import com.toeicvocab.dto.response.PostResponse;
import com.toeicvocab.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 게시글 생성
    @PostMapping
    public ResponseEntity<PostResponse> createPost(
            Authentication authentication,
            @Valid @RequestBody PostRequest postRequest) {
        String username = authentication.getName();
        return ResponseEntity.ok(postService.createPost(username, postRequest));
    }

    // 게시글 수정
    @PutMapping("/{postId}")
    public ResponseEntity<PostResponse> updatePost(
            Authentication authentication,
            @PathVariable Long postId,
            @Valid @RequestBody PostRequest postRequest) {
        String username = authentication.getName();
        return ResponseEntity.ok(postService.updatePost(postId, username, postRequest));
    }

    // 게시글 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(
            Authentication authentication,
            @PathVariable Long postId) {
        String username = authentication.getName();
        postService.deletePost(postId, username);
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }

    // 게시글 조회
    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.getPost(postId));
    }

    // 모든 게시글 조회
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // 사용자 작성 게시글 조회
    @GetMapping("/user")
    public ResponseEntity<List<PostResponse>> getUserPosts(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(postService.getUserPosts(username));
    }
}