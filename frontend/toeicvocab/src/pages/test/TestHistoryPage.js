import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserTestResults } from '../../slices/testSlice';
import BasicLayout from '../../layout/BasicLayout';
import TestHistory from '../../components/test/TestHistory';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button from '../../components/common/Button';
import './test.css';

function TestHistoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { testResults, loading, error } = useSelector((state) => state.test);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // 인증 상태 확인
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // 테스트 결과 불러오기
    dispatch(fetchUserTestResults());
  }, [dispatch, isAuthenticated, navigate]);
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <BasicLayout>
      <div className="test-history-page">
        <div className="test-history-header">
          <h1>테스트 기록</h1>
          <Button
            variant="primary"
            onClick={() => navigate('/test')}
          >
            새 테스트 시작
          </Button>
        </div>
        
        <TestHistory testResults={testResults} />
        
        {testResults.length === 0 && (
          <div className="no-test-history">
            <p>아직 테스트 기록이 없습니다.</p>
            <p>새로운 테스트를 시작해보세요!</p>
          </div>
        )}
      </div>
    </BasicLayout>
  );
}

export default TestHistoryPage;