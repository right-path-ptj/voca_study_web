import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWordbooks } from '../../slices/wordbookSlice';
import { fetchAllWords } from '../../slices/wordSlice';
import AdminLayout from '../../layout/AdminLayout';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

function AdminDashboardPage() {
  const dispatch = useDispatch();
  
  const { wordbooks, loading: wordbooksLoading, error: wordbooksError } = useSelector((state) => state.wordbook);
  const { words, loading: wordsLoading, error: wordsError } = useSelector((state) => state.word);
  
  useEffect(() => {
    dispatch(fetchAllWordbooks());
    dispatch(fetchAllWords());
  }, [dispatch]);
  
  const loading = wordbooksLoading || wordsLoading;
  const error = wordbooksError || wordsError;
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  // 난이도별 단어 수 계산
  const wordsByDifficulty = words.reduce((acc, word) => {
    acc[word.difficultyLevel] = (acc[word.difficultyLevel] || 0) + 1;
    return acc;
  }, {});
  
  // 정렬된 배열 미리 계산
  const sortedWordbooks = [...wordbooks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const sortedWords = [...words].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  
  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>관리자 대시보드</h1>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-title">단어장</div>
            <div className="stat-value">{wordbooks.length}개</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">단어</div>
            <div className="stat-value">{words.length}개</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">쉬움</div>
            <div className="stat-value">{wordsByDifficulty.EASY || 0}개</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">보통</div>
            <div className="stat-value">{wordsByDifficulty.MEDIUM || 0}개</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">어려움</div>
            <div className="stat-value">{wordsByDifficulty.HARD || 0}개</div>
          </div>
        </div>
        
        <div className="dashboard-sections">
          <div className="dashboard-section">
            <h2>최근 단어장</h2>
            <div className="dashboard-list">
              {wordbooks.length > 0 ? (
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>단어 수</th>
                      <th>생성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedWordbooks.map((wordbook) => (
                      <tr key={wordbook.id}>
                        <td>{wordbook.title}</td>
                        <td>{wordbook.wordCount}</td>
                        <td>{new Date(wordbook.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>등록된 단어장이 없습니다.</p>
              )}
            </div>
          </div>
          
          <div className="dashboard-section">
            <h2>최근 단어</h2>
            <div className="dashboard-list">
              {words.length > 0 ? (
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>단어</th>
                      <th>의미</th>
                      <th>난이도</th>
                      <th>단어장</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedWords.map((word) => (
                      <tr key={word.id}>
                        <td>{word.word}</td>
                        <td>{word.meaning}</td>
                        <td>
                          {word.difficultyLevel === 'EASY'
                            ? '쉬움'
                            : word.difficultyLevel === 'MEDIUM'
                            ? '보통'
                            : '어려움'}
                        </td>
                        <td>{word.wordbookTitle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>등록된 단어가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;