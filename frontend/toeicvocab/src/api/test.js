import axios from '../utils/axios';

// 테스트용 단어 조회 API 함수
export const getWordsForTest = async (wordbookId) => {
  const response = await axios.get(`/api/tests/wordbook/${wordbookId}`);
  console.log('API 응답 데이터:', response.data);
   console.log('API 응답 단어 수:', response.data.length);
  return response.data;
};

// 테스트 결과 저장 API 함수
export const saveTestResult = async (testData) => {
  const response = await axios.post('/api/tests/results', testData);
  return response.data;
};

// 사용자 테스트 결과 조회 API 함수
export const getUserTestResults = async () => {
  const response = await axios.get('/api/tests/results');
  return response.data;
};