import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatScore, formatCorrectRate } from '../../utils/formatters';

function TestHistory({ testResults }) {
  const navigate = useNavigate();
  
  if (!testResults || testResults.length === 0) {
    return (
      <div className="no-test-history">
        <p>테스트 기록이 없습니다.</p>
      </div>
    );
  }
  
  // 단어장별로 그룹화
  const resultsByWordbook = testResults.reduce((acc, result) => {
    if (!acc[result.wordbookId]) {
      acc[result.wordbookId] = {
        wordbookId: result.wordbookId,
        wordbookTitle: result.wordbookTitle,
        results: [],
      };
    }
    
    acc[result.wordbookId].results.push(result);
    return acc;
  }, {});
  
  return (
    <div className="test-history">
      
      {Object.values(resultsByWordbook).map((wordbook) => (
        <div key={wordbook.wordbookId} className="wordbook-history">
          <h3
            className="wordbook-title"
            onClick={() => navigate(`/wordbooks/${wordbook.wordbookId}`)}
          >
            {wordbook.wordbookTitle}
          </h3>
          
          <div className="history-list">
            <table className="history-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>정답/총문제</th>
                  <th>정답률</th>
                  <th>점수</th>
                </tr>
              </thead>
              <tbody>
                {wordbook.results.map((result) => (
                  <tr
                    key={result.id}
                    onClick={() => navigate(`/test/result/${result.wordbookId}/${result.id}`)}
                    className="history-item"
                  >
                    <td>{formatDate(result.testDate)}</td>
                    <td>{result.correctCount}/{result.totalCount}</td>
                    <td>{formatCorrectRate(result.correctCount, result.totalCount)}</td>
                    <td className="test-score">{formatScore(result.score)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestHistory;
