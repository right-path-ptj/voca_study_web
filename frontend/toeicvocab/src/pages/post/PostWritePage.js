// src/pages/post/PostWritePage.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../layout/BasicLayout';
import PostForm from '../../components/post/PostForm';
import './post.css';

function PostWritePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // 인증 상태 확인
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <BasicLayout>
      <div className="post-write-page">
        <PostForm isEditing={false} />
      </div>
    </BasicLayout>
  );
}

export default PostWritePage;