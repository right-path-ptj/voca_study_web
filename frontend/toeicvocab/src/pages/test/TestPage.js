import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWordsForTest, startTest, clearTestState } from '../../slices/testSlice';
import { fetchWordbook } from '../../slices/wordbookSlice';
import BasicLayout from '../../layout/BasicLayout';
import TestQuestions from '../../components/test/TestQuestions';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button from '../../components/common/Button';
import './test.css';

function TestPage() {
  const { wordbookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { testWords, loading, error, testInProgress } = useSelector((state) => state.test);
  const { currentWordbook, loading: wordbookLoading, error: wordbookError } = useSelector((state) => state.wordbook);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // 인증 상태 확인
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // 단어장 정보와 테스트 단어 불러오기
    dispatch(fetchWordbook({ wordbookId, includeWords: false }));
    dispatch(fetchWordsForTest(wordbookId))
    // .unwrap()
    // .then((result) => {
    //   console.log('테스트 단어 로드 결과:', result);
    //   // Redux 스토어의 현재 상태를 출력
    //   console.log('Redux 상태:', store.getState().test.testWords);
    // })
    // .catch((error) => {
    //   console.error('테스트 단어 로드 실패:', error);
    // });
    
    // 컴포넌트 언마운트 시 테스트 상태 초기화
    return () => {
      dispatch(clearTestState());
    };
  }, [dispatch, wordbookId, isAuthenticated, navigate]);
  
  const handleStartTest = () => {
    dispatch(startTest());
  };
  
  const isLoading = loading || wordbookLoading;
  const isError = error || wordbookError;
  
  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error || wordbookError} />;
  
  // 단어가 없는 경우
  if (testWords.length === 0) {
    return (
      <BasicLayout>
        <div className="test-page">
          <div className="no-test-words">
            <h2>단어 없음</h2>
            <p>선택한 단어장에 테스트할 단어가 없습니다.</p>
            <Button
              variant="primary"
              onClick={() => navigate('/test')}
            >
              다른 단어장 선택하기
            </Button>
          </div>
        </div>
      </BasicLayout>
    );
  }
  
  return (
    <BasicLayout>
      <div className="test-page">
        {!testInProgress ? (
          <div className="test-intro">
            <h1>{currentWordbook?.title} 테스트</h1>
            <div className="test-info">
              <p>총 {testWords.length}개의 단어로 테스트가 구성되어 있습니다.</p>
              <p>단어의 뜻을 정확히 선택해주세요.</p>
            </div>
            <Button
              variant="primary"
              onClick={handleStartTest}
              className="start-test-btn"
            >
              테스트 시작하기
            </Button>
          </div>
        ) : (
          <TestQuestions wordbookId={wordbookId} />
        )}
      </div>
    </BasicLayout>
  );
}

export default TestPage;