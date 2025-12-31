package com.toeicvocab.repository;

import com.toeicvocab.domain.Post;
import com.toeicvocab.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreatedAtDesc(); // 게시글 최신순 조회

    List<Post> findByUserOrderByCreatedAtDesc(User user); // 사용자별 게시글 최신순 조회
}