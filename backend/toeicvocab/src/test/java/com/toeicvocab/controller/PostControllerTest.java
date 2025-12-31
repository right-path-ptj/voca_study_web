//package com.toeicvocab.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.toeicvocab.dto.request.PostRequest;
//import com.toeicvocab.dto.response.PostResponse;
//import com.toeicvocab.service.PostService;
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
//public class PostControllerTest {
//
//    @Mock
//    private PostService postService;
//
//    @InjectMocks
//    private PostController postController;
//
//    private MockMvc mockMvc;
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setUp() {
//        mockMvc = MockMvcBuilders.standaloneSetup(postController).build();
//        objectMapper = new ObjectMapper();
//
//        // 테스트를 위한 인증 정보 설정
//        Authentication auth = new UsernamePasswordAuthenticationToken("testuser", null);
//        SecurityContextHolder.getContext().setAuthentication(auth);
//    }
//
//    @Test
//    void createPost_Success() throws Exception {
//        // Given
//        PostRequest postRequest = new PostRequest();
//        postRequest.setTitle("테스트 게시글");
//        postRequest.setContent("이것은 테스트 게시글입니다.");
//
//        PostResponse postResponse = PostResponse.builder()
//                .id(1L)
//                .title("테스트 게시글")
//                .content("이것은 테스트 게시글입니다.")
//                .userId(1L)
//                .username("testuser")
//                .commentCount(0)
//                .build();
//
//        when(postService.createPost(anyString(), any(PostRequest.class))).thenReturn(postResponse);
//
//        // When & Then
//        mockMvc.perform(post("/api/posts")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(postRequest)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.title").value("테스트 게시글"))
//                .andExpect(jsonPath("$.content").value("이것은 테스트 게시글입니다."))
//                .andExpect(jsonPath("$.username").value("testuser"));
//    }
//
//    @Test
//    void getAllPosts_Success() throws Exception {
//        // Given
//        PostResponse post1 = PostResponse.builder()
//                .id(1L)
//                .title("첫 번째 게시글")
//                .userId(1L)
//                .username("testuser")
//                .commentCount(2)
//                .build();
//
//        PostResponse post2 = PostResponse.builder()
//                .id(2L)
//                .title("두 번째 게시글")
//                .userId(2L)
//                .username("user2")
//                .commentCount(0)
//                .build();
//
//        List<PostResponse> posts = Arrays.asList(post1, post2);
//
//        when(postService.getAllPosts()).thenReturn(posts);
//
//        // When & Then
//        mockMvc.perform(get("/api/posts"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].id").value(1))
//                .andExpect(jsonPath("$[0].title").value("첫 번째 게시글"))
//                .andExpect(jsonPath("$[0].username").value("testuser"))
//                .andExpect(jsonPath("$[1].id").value(2))
//                .andExpect(jsonPath("$[1].title").value("두 번째 게시글"))
//                .andExpect(jsonPath("$[1].username").value("user2"));
//    }
//
//    @Test
//    void getPost_Success() throws Exception {
//        // Given
//        PostResponse postResponse = PostResponse.builder()
//                .id(1L)
//                .title("테스트 게시글")
//                .content("이것은 테스트 게시글입니다.")
//                .userId(1L)
//                .username("testuser")
//                .commentCount(0)
//                .build();
//
//        when(postService.getPost(anyLong())).thenReturn(postResponse);
//
//        // When & Then
//        mockMvc.perform(get("/api/posts/1"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.title").value("테스트 게시글"))
//                .andExpect(jsonPath("$.content").value("이것은 테스트 게시글입니다."))
//                .andExpect(jsonPath("$.username").value("testuser"));
//    }
//
//    @Test
//    void updatePost_Success() throws Exception {
//        // Given
//        PostRequest postRequest = new PostRequest();
//        postRequest.setTitle("수정된 게시글");
//        postRequest.setContent("내용이 수정되었습니다.");
//
//        PostResponse postResponse = PostResponse.builder()
//                .id(1L)
//                .title("수정된 게시글")
//                .content("내용이 수정되었습니다.")
//                .userId(1L)
//                .username("testuser")
//                .commentCount(0)
//                .build();
//
//        when(postService.updatePost(anyLong(), anyString(), any(PostRequest.class))).thenReturn(postResponse);
//
//        // When & Then
//        mockMvc.perform(put("/api/posts/1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(postRequest)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.title").value("수정된 게시글"))
//                .andExpect(jsonPath("$.content").value("내용이 수정되었습니다."));
//    }
//
//    @Test
//    void deletePost_Success() throws Exception {
//        // Given
//        doNothing().when(postService).deletePost(anyLong(), anyString());
//
//        // When & Then
//        mockMvc.perform(delete("/api/posts/1"))
//                .andExpect(status().isOk());
//    }
//}
