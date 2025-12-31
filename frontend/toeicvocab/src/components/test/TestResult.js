import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { formatDate, formatCorrectRate } from '../../utils/formatters';

function TestResult({ testResult, wordbook }) {
  const navigate = useNavigate();
  
  if (!testResult) {
    return (
      <div className="no-test-result">
        <p>테스트 결과가 없습니다.</p>
        <Button variant="primary" onClick={() => navigate('/test')}>
          테스트 선택 페이지로 이동
        </Button>
      </div>
    );
  }
  
  return (
    <div className="test-result">
      <h2>테스트 결과</h2>
      
      <div className="result-card">
        <div className="result-header">
          <h3>{wordbook?.title} 테스트 결과</h3>
          <p className="result-date">{formatDate(testResult.testDate)}</p>
        </div>
        
        <div className="result-info">
          <div className="result-item">
            <span className="result-label">총 문제 수:</span>
            <span className="result-value">{testResult.totalCount}문제</span>
          </div>
          <div className="result-item">
            <span className="result-label">맞은 문제 수:</span>
            <span className="result-value">{testResult.correctCount}문제</span>
          </div>
          <div className="result-item">
            <span className="result-label">정답률:</span>
            <span className="result-value">
              {formatCorrectRate(testResult.correctCount, testResult.totalCount)}
            </span>
          </div>
          <div className="result-item">
            <span className="result-label">TOEIC 환산 점수:</span>
            <span className="result-value result-score">{testResult.score}점</span>
          </div>
        </div>
      </div>
      
      <div className="result-message">
        {testResult.score >= 900 ? (
          <p>훌륭합니다! 완벽에 가까운 점수입니다.</p>
        ) : testResult.score >= 800 ? (
          <p>좋은 성적입니다! 조금만 더 노력하면 최고 수준에 도달할 수 있어요.</p>
        ) : testResult.score >= 700 ? (
          <p>괜찮은 성적이지만 더 많은 연습이 필요합니다.</p>
        ) : (
          <p>더 많은 학습이 필요합니다. 단어 암기에 더 집중해보세요.</p>
        )}
      </div>
      
      <div className="result-actions">
        <Button variant="secondary" onClick={() => navigate('/test')}>
          다른 테스트 선택하기
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate(`/test/start/${wordbook.id}`)}
        >
          다시 테스트하기
        </Button>
      </div>
    </div>
  );
}

export default TestResult;