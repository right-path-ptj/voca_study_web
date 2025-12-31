package com.toeicvocab.service;

import com.toeicvocab.domain.Post;
import com.toeicvocab.domain.User;
import com.toeicvocab.dto.request.PostRequest;
import com.toeicvocab.dto.response.PostResponse;
import com.toeicvocab.repository.PostRepository;
import com.toeicvocab.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 게시글 생성
    @Transactional
    public PostResponse createPost(String username, PostRequest postRequest) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + username));

        Post post = Post.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .user(user)
                .build();

        Post savedPost = postRepository.save(post);
        return PostResponse.fromEntity(savedPost, true);
    }

    // 게시글 수정
    @Transactional
    public PostResponse updatePost(Long postId, String username, PostRequest postRequest) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + postId));

        // 작성자 확인
        if (!post.getUser().getUsername().equals(username)) {
            throw new RuntimeException("게시글 수정 권한이 없습니다.");
        }

        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());

        Post updatedPost = postRepository.save(post);
        return PostResponse.fromEntity(updatedPost, true);
    }

    // 게시글 삭제
    @Transactional
    public void deletePost(Long postId, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + postId));

        // 작성자 확인
        if (!post.getUser().getUsername().equals(username)) {
            throw new RuntimeException("게시글 삭제 권한이 없습니다.");
        }

        postRepository.delete(post);
    }

    // 게시글 조회
    @Transactional(readOnly = true)
    public PostResponse getPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + postId));

        return PostResponse.fromEntity(post, true);
    }

    // 모든 게시글 조회
    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(post -> PostResponse.fromEntity(post, false))
                .collect(Collectors.toList());
    }

    // 사용자별 게시글 조회
    @Transactional(readOnly = true)
    public List<PostResponse> getUserPosts(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + username));

        return postRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(post -> PostResponse.fromEntity(post, false))
                .collect(Collectors.toList());
    }
}