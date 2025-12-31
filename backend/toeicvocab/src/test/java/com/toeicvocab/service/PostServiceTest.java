package com.toeicvocab.service;

import com.toeicvocab.domain.Post;
import com.toeicvocab.domain.User;
import com.toeicvocab.dto.request.PostRequest;
import com.toeicvocab.dto.response.PostResponse;
import com.toeicvocab.repository.PostRepository;
import com.toeicvocab.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PostServiceTest {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User user;
    private User otherUser;
    private PostRequest postRequest;

    @BeforeEach
    void setUp() {
        // 테스트 전 데이터 정리
        postRepository.deleteAll();

        // 사용자 생성 및 저장 (role 추가)
        user = User.builder()
                .username("user3")
                .email("test3@example.com")
                .password(passwordEncoder.encode("1234"))
                .role("USER")  // Role 추가
                .build();
        user = userRepository.save(user);

        // 다른 사용자 생성 (권한 테스트용) (role 추가)
        otherUser = User.builder()
                .username("other1")
                .email("other1@example.com")
                .password(passwordEncoder.encode("1234"))
                .role("USER")  // Role 추가
                .build();
        otherUser = userRepository.save(otherUser);

        // 게시글 요청 데이터 설정
        postRequest = new PostRequest();
        postRequest.setTitle("테스트 게시글");
        postRequest.setContent("이것은 테스트 게시글입니다.");
    }

    @Test
    void createPost_Success() {
        // When
        PostResponse result = postService.createPost(user.getUsername(), postRequest);

        // Then
        assertNotNull(result);
        assertEquals("테스트 게시글", result.getTitle());
        assertEquals("이것은 테스트 게시글입니다.", result.getContent());
        assertEquals(user.getUsername(), result.getUsername());

        // 데이터베이스에서 결과 확인
        List<Post> savedPosts = postRepository.findAllByOrderByCreatedAtDesc();
        assertFalse(savedPosts.isEmpty());
        assertEquals("테스트 게시글", savedPosts.get(0).getTitle());
        assertEquals(user.getId(), savedPosts.get(0).getUser().getId());
    }

    @Test
    void updatePost_Success() {
        // Given: 게시글 생성
        PostResponse createdPost = postService.createPost(user.getUsername(), postRequest);

        // 수정할 게시글 데이터 설정
        PostRequest updateRequest = new PostRequest();
        updateRequest.setTitle("수정된 게시글");
        updateRequest.setContent("내용이 수정되었습니다.");

        // When
        PostResponse result = postService.updatePost(
                createdPost.getId(), user.getUsername(), updateRequest);

        // Then
        assertNotNull(result);
        assertEquals("수정된 게시글", result.getTitle());
        assertEquals("내용이 수정되었습니다.", result.getContent());
        assertEquals(user.getUsername(), result.getUsername());

        // 데이터베이스에서 결과 확인
        Post updatedPost = postRepository.findById(createdPost.getId()).orElse(null);
        assertNotNull(updatedPost);
        assertEquals("수정된 게시글", updatedPost.getTitle());
        assertEquals("내용이 수정되었습니다.", updatedPost.getContent());
    }

    @Test
    void updatePost_NotAuthor() {
        // Given: 게시글 생성
        PostResponse createdPost = postService.createPost(user.getUsername(), postRequest);

        // When & Then: 다른 사용자가 수정 시도
        Exception exception = assertThrows(RuntimeException.class, () -> {
            postService.updatePost(createdPost.getId(), otherUser.getUsername(), postRequest);
        });

        assertEquals("게시글 수정 권한이 없습니다.", exception.getMessage());

        // 데이터베이스에서 변경이 없는지 확인
        Post post = postRepository.findById(createdPost.getId()).orElse(null);
        assertNotNull(post);
        assertEquals("테스트 게시글", post.getTitle());
    }

    @Test
    void getAllPosts_Success() {
        // Given: 여러 게시글 생성
        postService.createPost(user.getUsername(), postRequest);

        PostRequest post2Request = new PostRequest();
        post2Request.setTitle("두 번째 게시글");
        post2Request.setContent("두 번째 테스트 게시글입니다.");
        postService.createPost(user.getUsername(), post2Request);

        // When
        List<PostResponse> results = postService.getAllPosts();

        // Then
        assertNotNull(results);
        assertEquals(2, results.size());
        // 최신 게시글이 먼저 오는지 확인 (내림차순)
        assertEquals("두 번째 게시글", results.get(0).getTitle());
        assertEquals("테스트 게시글", results.get(1).getTitle());
    }

    @Test
    void deletePost_Success() {
        // Given: 게시글 생성
        PostResponse createdPost = postService.createPost(user.getUsername(), postRequest);
        Long postId = createdPost.getId();

        // 생성 확인
        assertTrue(postRepository.existsById(postId));

        // When
        postService.deletePost(postId, user.getUsername());

        // Then
        assertFalse(postRepository.existsById(postId));
    }

//    @Test
//    void deletePost_NotAuthor() {
//        // Given: 게시글 생성
//        PostResponse createdPost = postService.createPost(user.getUsername(), postRequest);
//        Long postId = createdPost.getId();
//
//        // When & Then: 다른 사용자가 삭제 시도
//        Exception exception = assertThrows(RuntimeException.class, () -> {
//            postService.deletePost(postId, otherUser.getUsername());
//        });
//
//        assertEquals("게시글 삭제 권한이 없습니다.", exception.getMessage());
//
//        // 데이터베이스에서 삭제되지 않았는지 확인
//        assertTrue(postRepository.existsById(postId));
//    }
}