// src/pages/post/PostEditPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost } from '../../slices/postSlice';
import BasicLayout from '../../layout/BasicLayout';
import PostForm from '../../components/post/PostForm';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import './post.css';

function PostEditPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentPost, loading, error } = useSelector((state) => state.post);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // 인증 상태 확인
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    dispatch(fetchPost(postId));
  }, [dispatch, postId, isAuthenticated, navigate]);
  
  useEffect(() => {
    // 작성자가 아닌 경우 접근 제한
    if (currentPost && user && currentPost.username !== user.username) {
      navigate(`/posts/${postId}`);
    }
  }, [currentPost, user, navigate, postId]);
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  if (!currentPost) {
    return (
      <BasicLayout>
        <div className="post-edit-page">
          <ErrorMessage message="게시글을 찾을 수 없습니다." />
        </div>
      </BasicLayout>
    );
  }
  
  return (
    <BasicLayout>
      <div className="post-edit-page">
        <PostForm post={currentPost} isEditing={true} />
      </div>
    </BasicLayout>
  );
}

export default PostEditPage;