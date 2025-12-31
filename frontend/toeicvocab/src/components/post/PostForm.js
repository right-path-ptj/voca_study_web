// src/components/post/PostForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost, editPost, clearError } from '../../slices/postSlice';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

function PostForm({ post = null, isEditing = false }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.post);
  
  useEffect(() => {
    // 수정 모드일 경우 기존 데이터 설정
    if (isEditing && post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
      });
    }
    
    // 컴포넌트 언마운트 시 에러 초기화
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, isEditing, post]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // 입력 값 변경 시 해당 필드의 에러 메시지 초기화
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = '제목을 입력해주세요.';
    }
    
    if (!formData.content.trim()) {
      errors.content = '내용을 입력해주세요.';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (validateForm()) {
      if (isEditing) {
        // 게시글 수정
        dispatch(editPost({ postId: post.id, postData: formData }))
          .unwrap()
          .then(() => {
            navigate(`/posts/${post.id}`);
          })
          .catch((error) => {
            // 오류 처리
            console.error("게시글 수정 오류:", error);
          });
      } else {
        // 게시글 생성
        dispatch(addPost(formData))
          .unwrap()
          .then((response) => {
            navigate(`/posts/${response.id}`);
          })
          .catch((error) => {
            // 오류 처리
            console.error("게시글 작성 오류:", error);
          });
      }
    }
  };
  
  return (
    <div className="post-form">
      <h2>{isEditing ? '게시글 수정' : '게시글 작성'}</h2>
      {error && <ErrorMessage message={typeof error === 'object' ? JSON.stringify(error) : error} />}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="제목"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
          error={formErrors.title}
          required
        />
        
        <div className="input-group">
          <label htmlFor="content" className="input-label">
            내용 <span className="required">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            className={`textarea-input ${formErrors.content ? 'input-error' : ''}`}
            rows="15"
            required
          />
          {formErrors.content && (
            <div className="error-text">{formErrors.content}</div>
          )}
        </div>
        
        <div className="form-buttons">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/posts')}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? '처리 중...' : isEditing ? '수정하기' : '작성하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;