// src/pages/post/PostDetailPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../../slices/postSlice';
import BasicLayout from '../../layout/BasicLayout';
import PostDetail from '../../components/post/PostDetail';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import './post.css';

function PostDetailPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  
  const { currentPost, loading, error } = useSelector((state) => state.post);
  
  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [dispatch, postId]);
  
  return (
    <BasicLayout>
      <div className="post-detail-page">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : !currentPost ? (
          <ErrorMessage message="게시글을 찾을 수 없습니다." />
        ) : (
          <PostDetail post={currentPost} />
        )}
      </div>
    </BasicLayout>
  );
}

export default PostDetailPage;