package com.toeicvocab.repository;

import com.toeicvocab.domain.Comment;
import com.toeicvocab.domain.Post;
import com.toeicvocab.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostOrderByCreatedAtAsc(Post post); // 게시글별 댓글 목록 조회

    List<Comment> findByUser(User user); // 사용자별 댓글 목록 조회
}