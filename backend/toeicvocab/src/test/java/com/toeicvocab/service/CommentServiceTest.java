//package com.toeicvocab.service;
//
//import com.toeicvocab.domain.Comment;
//import com.toeicvocab.domain.Post;
//import com.toeicvocab.domain.User;
//import com.toeicvocab.dto.request.CommentRequest;
//import com.toeicvocab.dto.request.PostRequest;
//import com.toeicvocab.dto.response.CommentResponse;
//import com.toeicvocab.dto.response.PostResponse;
//import com.toeicvocab.repository.CommentRepository;
//import com.toeicvocab.repository.PostRepository;
//import com.toeicvocab.repository.UserRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//public class CommentServiceTest {
//
//    @Autowired
//    private CommentRepository commentRepository;
//
//    @Autowired
//    private PostRepository postRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private CommentService commentService;
//
//    @Autowired
//    private PostService postService;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    private User user;
//    private User otherUser;
//    private Post post;
//    private CommentRequest commentRequest;
//
//    @BeforeEach
//    void setUp() {
//        // 테스트 전 데이터 정리
//        commentRepository.deleteAll();
//        postRepository.deleteAll();
//
//        // 사용자 생성 및 저장
//        user = User.builder()
//                .username("user3")
//                .email("test3@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .role("USER")  // Role 추가
//                .build();
//        user = userRepository.save(user);
//
//        // 다른 사용자 생성 (권한 테스트용)
//        otherUser = User.builder()
//                .username("otheruser3")
//                .email("other3@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .role("USER")  // Role 추가
//                .build();
//        otherUser = userRepository.save(otherUser);
//
//        // 게시글 생성
//        PostRequest postRequest = new PostRequest();
//        postRequest.setTitle("댓글 테스트용 게시글");
//        postRequest.setContent("댓글 테스트를 위한 게시글입니다.");
//        PostResponse postResponse = postService.createPost(user.getUsername(), postRequest);
//        post = postRepository.findById(postResponse.getId()).orElseThrow();
//
//        // 댓글 요청 데이터 설정
//        commentRequest = new CommentRequest();
//        commentRequest.setContent("테스트 댓글입니다.");
//    }
//
//    @Test
//    void createComment_Success() {
//        // When
//        CommentResponse result = commentService.createComment(post.getId(), user.getUsername(), commentRequest);
//
//        // Then
//        assertNotNull(result);
//        assertEquals("테스트 댓글입니다.", result.getContent());
//        assertEquals(user.getUsername(), result.getUsername());
//        assertEquals(post.getId(), result.getPostId());
//
//        // 데이터베이스에서 결과 확인
//        List<Comment> savedComments = commentRepository.findByPostIdOrderByCreatedAtDesc(post.getId());
//        assertFalse(savedComments.isEmpty());
//        assertEquals("테스트 댓글입니다.", savedComments.get(0).getContent());
//        assertEquals(user.getId(), savedComments.get(0).getUser().getId());
//    }
//
//    @Test
//    void getPostComments_Success() {
//        // Given: 여러 댓글 생성
//        commentService.createComment(post.getId(), user.getUsername(), commentRequest);
//
//        CommentRequest comment2Request = new CommentRequest();
//        comment2Request.setContent("두 번째 테스트 댓글입니다.");
//        commentService.createComment(post.getId(), otherUser.getUsername(), comment2Request);
//
//        // When
//        List<CommentResponse> results = commentService.getPostComments(post.getId());
//
//        // Then
//        assertNotNull(results);
//        assertEquals(2, results.size());
//        // 최신 댓글이 먼저 오는지 확인 (내림차순)
//        assertEquals("두 번째 테스트 댓글입니다.", results.get(0).getContent());
//        assertEquals(otherUser.getUsername(), results.get(0).getUsername());
//        assertEquals("테스트 댓글입니다.", results.get(1).getContent());
//        assertEquals(user.getUsername(), results.get(1).getUsername());
//    }
//
//    @Test
//    void updateComment_Success() {
//        // Given: 댓글 생성
//        CommentResponse createdComment = commentService.createComment(post.getId(), user.getUsername(), commentRequest);
//
//        // 수정할 댓글 데이터 설정
//        CommentRequest updateRequest = new CommentRequest();
//        updateRequest.setContent("수정된 댓글입니다.");
//
//        // When
//        CommentResponse result = commentService.updateComment(
//                createdComment.getId(), user.getUsername(), updateRequest);
//
//        // Then
//        assertNotNull(result);
//        assertEquals("수정된 댓글입니다.", result.getContent());
//        assertEquals(user.getUsername(), result.getUsername());
//
//        // 데이터베이스에서 결과 확인
//        Comment updatedComment = commentRepository.findById(createdComment.getId()).orElse(null);
//        assertNotNull(updatedComment);
//        assertEquals("수정된 댓글입니다.", updatedComment.getContent());
//    }
//
//    @Test
//    void updateComment_NotAuthor() {
//        // Given: 댓글 생성
//        CommentResponse createdComment = commentService.createComment(post.getId(), user.getUsername(), commentRequest);
//
//        // 수정할 댓글 데이터 설정
//        CommentRequest updateRequest = new CommentRequest();
//        updateRequest.setContent("수정된 댓글입니다.");
//
//        // When & Then: 다른 사용자가 수정 시도
//        Exception exception = assertThrows(RuntimeException.class, () -> {
//            commentService.updateComment(createdComment.getId(), otherUser.getUsername(), updateRequest);
//        });
//
//        assertEquals("댓글 수정 권한이 없습니다.", exception.getMessage());
//
//        // 데이터베이스에서 변경이 없는지 확인
//        Comment comment = commentRepository.findById(createdComment.getId()).orElse(null);
//        assertNotNull(comment);
//        assertEquals("테스트 댓글입니다.", comment.getContent());
//    }
//
//    @Test
//    void deleteComment_Success() {
//        // Given: 댓글 생성
//        CommentResponse createdComment = commentService.createComment(post.getId(), user.getUsername(), commentRequest);
//        Long commentId = createdComment.getId();
//
//        // 생성 확인
//        assertTrue(commentRepository.existsById(commentId));
//
//        // When
//        commentService.deleteComment(commentId, user.getUsername());
//
//        // Then
//        assertFalse(commentRepository.existsById(commentId));
//    }
//
////    @Test
////    void deleteComment_NotAuthor() {
////        // Given: 댓글 생성
////        CommentResponse createdComment = commentService.createComment(post.getId(), user.getUsername(), commentRequest);
////        Long commentId = createdComment.getId();
////
////        // When & Then: 다른 사용자가 삭제 시도
////        Exception exception = assertThrows(RuntimeException.class, () -> {
////            commentService.deleteComment(commentId, otherUser.getUsername());
////        });
////
////        assertEquals("댓글 삭제 권한이 없습니다.", exception.getMessage());
////
////        // 데이터베이스에서 삭제되지 않았는지 확인
////        assertTrue(commentRepository.existsById(commentId));
////    }
//}