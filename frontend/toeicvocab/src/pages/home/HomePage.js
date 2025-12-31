import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllWordbooks } from '../../slices/wordbookSlice';
import { fetchUserTestResults } from '../../slices/testSlice';
import BasicLayout from '../../layout/BasicLayout';
import WordbookItem from '../../components/wordbook/WordbookItem';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import './home.css';

function HomePage() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { wordbooks, loading: wordbooksLoading, error: wordbooksError } = useSelector((state) => state.wordbook);
  const { testResults, loading: testResultsLoading, error: testResultsError } = useSelector((state) => state.test);
  
  useEffect(() => {
    // 단어장 목록 불러오기
    dispatch(fetchAllWordbooks());
    
    // 로그인 상태일 경우 테스트 결과 불러오기
    if (isAuthenticated) {
      dispatch(fetchUserTestResults());
    }
  }, [dispatch, isAuthenticated]);
  
  const loading = wordbooksLoading || testResultsLoading;
  const error = wordbooksError || testResultsError;
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  // 최근 단어장 5개만 표시
  const recentWordbooks = [...wordbooks].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }).slice(0, 5);
  
  // 최근 테스트 결과 3개만 표시
  const recentTestResults = isAuthenticated && testResults.length > 0
    ? [...testResults].sort((a, b) => {
        return new Date(b.testDate) - new Date(a.testDate);
      }).slice(0, 3)
    : [];
  
  return (
    <BasicLayout>
      <div className="home-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1>TOEIC 단어 학습</h1>
            <p>효율적인 TOEIC 단어 학습과 테스트를 통해 영어 실력을 향상시키세요.</p>
            <div className="hero-buttons">
              <Link to="/wordbooks" className="hero-button primary">
                단어장 보기
              </Link>
              <Link to="/test" className="hero-button secondary">
                테스트 시작
              </Link>
            </div>
          </div>
        </section>
        
        <section className="recent-wordbooks-section">
          <div className="section-header">
            <h2>최근 단어장</h2>
            <Link to="/wordbooks" className="view-all-link">
              모두 보기
            </Link>
          </div>
          
          <div className="recent-wordbooks-grid">
            {recentWordbooks.length > 0 ? (
              recentWordbooks.map((wordbook) => (
                <Link 
                  to={`/wordbooks/${wordbook.id}`} 
                  key={wordbook.id}
                  className="wordbook-link"
                >
                  <WordbookItem wordbook={wordbook} />
                </Link>
              ))
            ) : (
              <div className="no-wordbooks">
                <p>등록된 단어장이 없습니다.</p>
              </div>
            )}
          </div>
        </section>
        
        {isAuthenticated && (
          <section className="user-section">
            <div className="welcome-message">
              <h2>안녕하세요, {user.username}님!</h2>
              <p>오늘도 TOEIC 단어 학습을 통해 영어 실력을 향상시켜보세요.</p>
            </div>
            
            {recentTestResults.length > 0 && (
              <div className="recent-tests">
                <h3>최근 테스트 결과</h3>
                <div className="test-results-list">
                  {recentTestResults.map((result) => (
                    <Link 
                      to={`/test/result/${result.wordbookId}/${result.id}`}
                      key={result.id}
                      className="test-result-item"
                    >
                      <div className="test-result-title">
                        {result.wordbookTitle}
                      </div>
                      <div className="test-result-info">
                        <span className="test-score">{result.score}점</span>
                        <span className="test-correct">
                          {result.correctCount}/{result.totalCount} 문제
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
        
        <section className="features-section">
          <h2>TOEIC 단어 학습 특징</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>다양한 단어장</h3>
              <p>초급부터 고급까지 다양한 수준의 TOEIC 단어장을 제공합니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✏️</div>
              <h3>맞춤형 테스트</h3>
              <p>단어장별로 테스트를 진행하고 결과를 확인할 수 있습니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>학습 진도 관리</h3>
              <p>테스트 결과를 통해 학습 진도를 확인하고 관리할 수 있습니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>커뮤니티</h3>
              <p>다른 사용자들과 게시판을 통해 정보와 팁을 공유할 수 있습니다.</p>
            </div>
          </div>
        </section>
      </div>
    </BasicLayout>
  );
}

export default HomePage;