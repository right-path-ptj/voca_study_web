// src/components/post/PostList.js
import React from 'react';
import PostItem from './PostItem';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/formatters';

function PostList({ posts }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  return (
    <div className="post-list">
      <div className="post-list-header">
        <h2>게시글 목록</h2>
        {isAuthenticated && (
          <Button
            variant="primary"
            onClick={() => navigate('/posts/write')}
          >
            글 작성
          </Button>
        )}
      </div>
      
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>등록된 게시글이 없습니다.</p>
        </div>
      ) : (
        <div className="post-list-table">
          <div className="post-list-header-row">
            <div className="post-header-title">제목</div>
            <div className="post-header-author">작성자</div>
            <div className="post-header-date">작성일</div>
            <div className="post-header-comments">댓글</div>
          </div>
          
          {posts.map((post) => (
            <div key={post.id} className="post-list-item">
              <div className="post-list-title">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </div>
              <div className="post-list-author">{post.username}</div>
              <div className="post-list-date">{formatDate(post.createdAt)}</div>
              <div className="post-list-comments">{post.commentCount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;