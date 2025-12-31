import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllWordbooks } from '../../slices/wordbookSlice';
import BasicLayout from '../../layout/BasicLayout';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { formatDate } from '../../utils/formatters';
import './test.css';

function TestSelectionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wordbooks, loading, error } = useSelector((state) => state.wordbook);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(fetchAllWordbooks());
  }, [dispatch]);
  
  const handleSelectWordbook = (wordbookId) => {
    navigate(`/test/start/${wordbookId}`);
  };
  
  if (!isAuthenticated) {
    return (
      <BasicLayout>
        <div className="test-selection-page">
          <div className="login-required-message">
            <h2>로그인이 필요합니다</h2>
            <p>테스트를 시작하려면 로그인이 필요합니다.</p>
            <Button
              variant="primary"
              onClick={() => navigate('/login')}
            >
              로그인 하기
            </Button>
          </div>
        </div>
      </BasicLayout>
    );
  }
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <BasicLayout>
      <div className="test-selection-page">
        <h1>테스트 선택</h1>
        <p className="page-description">
          테스트할 단어장을 선택하세요.
        </p>
        
        {wordbooks.length === 0 ? (
          <div className="no-wordbooks">
            <p>테스트할 단어장이 없습니다.</p>
          </div>
        ) : (
          <div className="wordbook-selection-list">
            {wordbooks.map((wordbook) => (
              <div key={wordbook.id} className="wordbook-selection-item">
                <div className="wordbook-info">
                  <h3 className="wordbook-title">{wordbook.title}</h3>
                  {wordbook.description && (
                    <p className="wordbook-description">{wordbook.description}</p>
                  )}
                  <div className="wordbook-meta">
                    <span className="wordbook-count">단어 수: {wordbook.wordCount}개</span>
                    <span className="wordbook-date">
                      생성일: {formatDate(wordbook.createdAt)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  onClick={() => handleSelectWordbook(wordbook.id)}
                  disabled={wordbook.wordCount === 0}
                >
                  {wordbook.wordCount === 0 ? '단어 없음' : '테스트 시작'}
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <div className="test-history-link">
          <Button
            variant="secondary"
            onClick={() => navigate('/test/history')}
          >
            테스트 기록 보기
          </Button>
        </div>
      </div>
    </BasicLayout>
  );
}

export default TestSelectionPage;