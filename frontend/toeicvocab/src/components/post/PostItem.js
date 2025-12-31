// src/components/post/PostItem.js
import React from 'react';
import { formatDate } from '../../utils/formatters';
import { Link } from 'react-router-dom';

function PostItem({ post }) {
  return (
    <div className="post-item">
      <Link to={`/posts/${post.id}`} className="post-link">
        <h3 className="post-title">{post.title}</h3>
      </Link>
      <div className="post-info">
        <span className="post-author">{post.username}</span>
        <span className="post-date">{formatDate(post.createdAt)}</span>
        <span className="post-comments">댓글 {post.commentCount}개</span>
      </div>
    </div>
  );
}

export default PostItem;