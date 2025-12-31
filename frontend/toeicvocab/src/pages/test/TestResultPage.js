import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserTestResults } from '../../slices/testSlice';
import { fetchWordbook } from '../../slices/wordbookSlice';
import BasicLayout from '../../layout/BasicLayout';
import TestResult from '../../components/test/TestResult';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import './test.css';

function TestResultPage() {
  const { wordbookId, resultId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { testResults, currentTestResult, loading, error } = useSelector((state) => state.test);
  const { currentWordbook, loading: wordbookLoading, error: wordbookError } = useSelector((state) => state.wordbook);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // 인증 상태 확인
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // 테스트 결과와 단어장 정보 불러오기
    dispatch(fetchUserTestResults());
    dispatch(fetchWordbook({ wordbookId, includeWords: false }));
  }, [dispatch, wordbookId, isAuthenticated, navigate]);
  
  // 특정 테스트 결과 선택
  const testResult = resultId
    ? testResults.find(result => result.id === parseInt(resultId))
    : currentTestResult;
  
  const isLoading = loading || wordbookLoading;
  const isError = error || wordbookError;
  
  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error || wordbookError} />;
  
  if (!testResult) {
    return (
      <BasicLayout>
        <div className="test-result-page">
          <div className="no-test-result">
            <h2>테스트 결과 없음</h2>
            <p>테스트 결과를 찾을 수 없습니다.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/test')}
            >
              테스트 선택 페이지로 이동
            </button>
          </div>
        </div>
      </BasicLayout>
    );
  }
  
  return (
    <BasicLayout>
      <div className="test-result-page">
        <TestResult testResult={testResult} wordbook={currentWordbook} />
      </div>
    </BasicLayout>
  );
}

export default TestResultPage;