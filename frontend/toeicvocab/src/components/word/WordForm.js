import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addWord, editWord, clearError } from '../../slices/wordSlice';
import { fetchAllWordbooks } from '../../slices/wordbookSlice';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import './word.css';

function WordForm({ word = null, isEditing = false }) {
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    example: '',
    difficultyLevel: 'EASY',
    wordbookId: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.word);
  const { wordbooks } = useSelector((state) => state.wordbook);
  
  useEffect(() => {
    // 단어장 목록 불러오기
    // dispatch(fetchAllWordbooks());
    
    // 수정 모드일 경우 기존 데이터 설정
    if (isEditing && word) {
      setFormData({
        word: word.word || '',
        meaning: word.meaning || '',
        example: word.example || '',
        difficultyLevel: word.difficultyLevel || 'EASY',
        wordbookId: word.wordbookId || '',
      });
    }
    
    // 컴포넌트 언마운트 시 에러 초기화
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, isEditing, word]);
  
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
    
    if (!formData.word.trim()) {
      errors.word = '단어를 입력해주세요.';
    }
    
    if (!formData.meaning.trim()) {
      errors.meaning = '의미를 입력해주세요.';
    }
    
    if (!formData.wordbookId) {
      errors.wordbookId = '단어장을 선택해주세요.';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (validateForm()) {
      if (isEditing) {
        // 단어 수정
        dispatch(editWord({ wordId: word.id, wordData: formData }))
          .unwrap()
          .then(() => {
            navigate('/admin/words');
          });
      } else {
        // 단어 생성
        dispatch(addWord(formData))
          .unwrap()
          .then(() => {
            navigate('/admin/words');
          });
      }
    }
  };
  
  return (
    <div className="word-form">
      <h2>{isEditing ? '단어 수정' : '단어 추가'}</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="단어"
          name="word"
          value={formData.word}
          onChange={handleChange}
          placeholder="단어를 입력하세요"
          error={formErrors.word}
          required
        />
        <TextInput
          label="의미"
          name="meaning"
          value={formData.meaning}
          onChange={handleChange}
          placeholder="단어의 의미를 입력하세요"
          error={formErrors.meaning}
          required
        />
        <TextInput
          label="예문"
          name="example"
          value={formData.example}
          onChange={handleChange}
          placeholder="예문을 입력하세요 (선택사항)"
        />
        
        <div className="input-group">
          <label htmlFor="difficultyLevel" className="input-label">
            난이도 <span className="required">*</span>
          </label>
          <select
            id="difficultyLevel"
            name="difficultyLevel"
            value={formData.difficultyLevel}
            onChange={handleChange}
            className="select-input"
            required
          >
            <option value="EASY">쉬움</option>
            <option value="MEDIUM">보통</option>
            <option value="HARD">어려움</option>
          </select>
        </div>
        
        <div className="input-group">
          <label htmlFor="wordbookId" className="input-label">
            단어장 <span className="required">*</span>
          </label>
          <select
            id="wordbookId"
            name="wordbookId"
            value={formData.wordbookId}
            onChange={handleChange}
            className="select-input"
            error={formErrors.wordbookId}
            required
          >
            <option value="">단어장 선택</option>
            {wordbooks.map((wordbook) => (
              <option key={wordbook.id} value={wordbook.id}>
                {wordbook.title}
              </option>
            ))}
          </select>
          {formErrors.wordbookId && (
            <div className="error-text">{formErrors.wordbookId}</div>
          )}
        </div>
        
        <div className="form-buttons">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/words')}
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

export default WordForm;