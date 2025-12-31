import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addWordbook, editWordbook, clearError } from '../../slices/wordbookSlice';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

function WordbookForm({ wordbook = null, isEditing = false }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.wordbook);
  
  useEffect(() => {
    // 수정 모드일 경우 기존 데이터 설정
    if (isEditing && wordbook) {
      setTitle(wordbook.title || '');
      setDescription(wordbook.description || '');
    }
    
    // 컴포넌트 언마운트 시 에러 초기화
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, isEditing, wordbook]);
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (titleError) {
      setTitleError('');
    }
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  
  const validateForm = () => {
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError('단어장 제목을 입력해주세요.');
      isValid = false;
    }
    
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (validateForm()) {
      if (isEditing) {
        // 단어장 수정
        dispatch(editWordbook({
          wordbookId: wordbook.id,
          title,
          description,
        }))
          .unwrap()
          .then(() => {
            navigate('/admin/wordbooks');
          });
      } else {
        // 단어장 생성
        dispatch(addWordbook({ title, description }))
          .unwrap()
          .then(() => {
            navigate('/admin/wordbooks');
          });
      }
    }
  };
  
  return (
    <div className="wordbook-form">
      <h2>{isEditing ? '단어장 수정' : '단어장 추가'}</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="단어장 제목"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="단어장 제목을 입력하세요"
          error={titleError}
          required
        />
        <div className="input-group">
          <label htmlFor="description" className="input-label">
            설명 (선택사항)
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="단어장에 대한 설명을 입력하세요"
            className="textarea-input"
            rows="4"
          />
        </div>
        
        <div className="form-buttons">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/wordbooks')}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? '처리 중...' : isEditing ? '수정' : '추가'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default WordbookForm;
