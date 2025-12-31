package com.toeicvocab.service;

import com.toeicvocab.domain.Admin;
import com.toeicvocab.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    // 관리자 생성 (시스템 초기 설정용)
    @Transactional
    public Admin createAdmin(String username, String password) {
        // 관리자 이름 중복 확인
        if (adminRepository.existsByUsername(username)) {
            throw new RuntimeException("이미 사용 중인 관리자 이름입니다.");
        }

        // 관리자 엔티티 생성 및 저장
        Admin admin = Admin.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .build();

        return adminRepository.save(admin);
    }

    // 관리자 ID로 관리자 정보 조회
    @Transactional(readOnly = true)
    public Admin getAdminById(Long adminId) {
        return adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("관리자를 찾을 수 없습니다: " + adminId));
    }
}