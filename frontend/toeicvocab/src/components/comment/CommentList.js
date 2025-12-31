import React from 'react';
import CommentItem from './CommentItem';
import './comment.css';

function CommentList({ comments, postId }) { // postId 파라미터 추가
  if (!comments || comments.length === 0) {
    return (
      <div className="no-comments">
        <p>댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
      </div>
    );
  }
  
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
}

export default CommentList;