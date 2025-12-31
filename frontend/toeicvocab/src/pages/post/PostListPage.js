// src/pages/post/PostListPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../../slices/postSlice';
import BasicLayout from '../../layout/BasicLayout';
import PostList from '../../components/post/PostList';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import './post.css';

function PostListPage() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);
  
  return (
    <BasicLayout>
      <div className="post-list-page">
        <h1>게시판</h1>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </BasicLayout>
  );
}

export default PostListPage;