// CommentService.java
package com.toeicvocab.service;

import com.toeicvocab.domain.Comment;
import com.toeicvocab.domain.Post;
import com.toeicvocab.domain.User;
import com.toeicvocab.dto.request.CommentRequest;
import com.toeicvocab.dto.response.CommentResponse;
import com.toeicvocab.repository.CommentRepository;
import com.toeicvocab.repository.PostRepository;
import com.toeicvocab.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 댓글 생성
    @Transactional
    public CommentResponse createComment(String username, CommentRequest commentRequest) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + username));

        Post post = postRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + commentRequest.getPostId()));

        Comment comment = Comment.builder()
                .content(commentRequest.getContent())
                .user(user)
                .post(post)
                .build();

        Comment savedComment = commentRepository.save(comment);
        return CommentResponse.fromEntity(savedComment);
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(Long commentId, String username) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다: " + commentId));

        // 작성자 확인
        if (!comment.getUser().getUsername().equals(username)) {
            throw new RuntimeException("댓글 삭제 권한이 없습니다.");
        }

        commentRepository.delete(comment);
    }

    // 게시글별 댓글 조회
    @Transactional(readOnly = true)
    public List<CommentResponse> getCommentsByPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + postId));

        return commentRepository.findByPostOrderByCreatedAtAsc(post).stream()
                .map(CommentResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // 사용자별 댓글 조회
    @Transactional(readOnly = true)
    public List<CommentResponse> getCommentsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + username));

        return commentRepository.findByUser(user).stream()
                .map(CommentResponse::fromEntity)
                .collect(Collectors.toList());
    }
}