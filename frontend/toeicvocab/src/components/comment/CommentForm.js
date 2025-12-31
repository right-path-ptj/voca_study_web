import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, clearError } from '../../slices/commentSlice';
import { fetchPost } from '../../slices/postSlice'; // 게시글 다시 불러오기 위해 추가
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import './comment.css';

function CommentForm({ postId }) {
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.comment);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (contentError) {
      setContentError('');
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    
    if (!content.trim()) {
      setContentError('댓글 내용을 입력해주세요.');
      isValid = false;
    }
    
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 로그인 상태 확인
    if (!isAuthenticated) {
      setContentError('댓글을 작성하려면 로그인이 필요합니다.');
      return;
    }
    
    // 폼 유효성 검사
    if (validateForm()) {
      dispatch(addComment({
        postId,
        content,
      }))
        .unwrap()
        .then(() => {
          // 성공 시 폼 초기화
          setContent('');
          dispatch(clearError());
          
          // 댓글 추가 후 게시글을 다시 불러와 최신 댓글 목록을 가져옴
          dispatch(fetchPost(postId));
        })
        .catch((error) => {
          console.error("댓글 추가 실패:", error);
        });
    }
  };
  
  return (
    <div className="comment-form-container">
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="input-group">
          <textarea
            placeholder={isAuthenticated ? "댓글을 작성하세요..." : "댓글을 작성하려면 로그인이 필요합니다."}
            value={content}
            onChange={handleContentChange}
            className={`comment-textarea ${contentError ? 'input-error' : ''}`}
            rows="3"
            disabled={!isAuthenticated}
          />
          {contentError && (
            <div className="error-text">{contentError}</div>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          className="comment-submit-btn"
          disabled={loading || !isAuthenticated}
        >
          {loading ? '등록 중...' : '댓글 등록'}
        </Button>
      </form>
    </div>
  );
}

export default CommentForm;