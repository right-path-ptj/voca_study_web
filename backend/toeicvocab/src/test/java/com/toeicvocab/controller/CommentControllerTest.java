//package com.toeicvocab.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.toeicvocab.dto.request.CommentRequest;
//import com.toeicvocab.dto.response.CommentResponse;
//import com.toeicvocab.service.CommentService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.MediaType;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.Mockito.doNothing;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ExtendWith(MockitoExtension.class)
//public class CommentControllerTest {
//
//    @Mock
//    private CommentService commentService;
//
//    @InjectMocks
//    private CommentController commentController;
//
//    private MockMvc mockMvc;
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setUp() {
//        mockMvc = MockMvcBuilders.standaloneSetup(commentController).build();
//        objectMapper = new ObjectMapper();
//
//        // 테스트를 위한 인증 정보 설정
//        Authentication auth = new UsernamePasswordAuthenticationToken("testuser", null);
//        SecurityContextHolder.getContext().setAuthentication(auth);
//    }
//
//    @Test
//    void createComment_Success() throws Exception {
//        // Given
//        CommentRequest commentRequest = new CommentRequest();
//        commentRequest.setContent("테스트 댓글입니다.");
//        commentRequest.setPostId(1L);
//
//        CommentResponse commentResponse = CommentResponse.builder()
//                .id(1L)
//                .content("테스트 댓글입니다.")
//                .postId(1L)
//                .userId(1L)
//                .username("testuser")
//                .build();
//
//        when(commentService.createComment(anyString(), any(CommentRequest.class))).thenReturn(commentResponse);
//
//        // When & Then
//        mockMvc.perform(post("/api/comments")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(commentRequest)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.content").value("테스트 댓글입니다."))
//                .andExpect(jsonPath("$.postId").value(1))
//                .andExpect(jsonPath("$.userId").value(1))
//                .andExpect(jsonPath("$.username").value("testuser"));
//    }
//
//    @Test
//    void deleteComment_Success() throws Exception {
//        // Given
//        doNothing().when(commentService).deleteComment(anyLong(), anyString());
//
//        // When & Then
//        mockMvc.perform(delete("/api/comments/1"))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void getCommentsByPost_Success() throws Exception {
//        // Given
//        CommentResponse comment1 = CommentResponse.builder()
//                .id(1L)
//                .content("첫 번째 댓글")
//                .postId(1L)
//                .userId(1L)
//                .username("testuser")
//                .build();
//
//        CommentResponse comment2 = CommentResponse.builder()
//                .id(2L)
//                .content("두 번째 댓글")
//                .postId(1L)
//                .userId(2L)
//                .username("user2")
//                .build();
//
//        List<CommentResponse> comments = Arrays.asList(comment1, comment2);
//
//        when(commentService.getCommentsByPost(anyLong())).thenReturn(comments);
//
//        // When & Then
//        mockMvc.perform(get("/api/comments/post/1"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].id").value(1))
//                .andExpect(jsonPath("$[0].content").value("첫 번째 댓글"))
//                .andExpect(jsonPath("$[0].username").value("testuser"))
//                .andExpect(jsonPath("$[1].id").value(2))
//                .andExpect(jsonPath("$[1].content").value("두 번째 댓글"))
//                .andExpect(jsonPath("$[1].username").value("user2"));
//    }
//
//    @Test
//    void getCommentsByUser_Success() throws Exception {
//        // Given
//        CommentResponse comment1 = CommentResponse.builder()
//                .id(1L)
//                .content("첫 번째 댓글")
//                .postId(1L)
//                .userId(1L)
//                .username("testuser")
//                .build();
//
//        CommentResponse comment2 = CommentResponse.builder()
//                .id(3L)
//                .content("세 번째 댓글")
//                .postId(2L)
//                .userId(1L)
//                .username("testuser")
//                .build();
//
//        List<CommentResponse> comments = Arrays.asList(comment1, comment2);
//
//        when(commentService.getCommentsByUser(anyString())).thenReturn(comments);
//
//        // When & Then
//        mockMvc.perform(get("/api/comments/user"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].id").value(1))
//                .andExpect(jsonPath("$[0].content").value("첫 번째 댓글"))
//                .andExpect(jsonPath("$[0].postId").value(1))
//                .andExpect(jsonPath("$[1].id").value(3))
//                .andExpect(jsonPath("$[1].content").value("세 번째 댓글"))
//                .andExpect(jsonPath("$[1].postId").value(2));
//    }
//}