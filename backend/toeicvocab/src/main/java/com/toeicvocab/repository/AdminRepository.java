package com.toeicvocab.repository;

import com.toeicvocab.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username); // 관리자 이름으로 관리자 찾기

    boolean existsByUsername(String username); // 관리자 이름 존재 여부 확인
}