import axios from '../utils/axios';

// 모든 단어장 조회 API 함수
export const getAllWordbooks = async () => {
  const response = await axios.get('/api/wordbooks');
  return response.data;
};

// 단어장 상세 조회 API 함수
export const getWordbook = async (wordbookId, includeWords = false) => {
  const response = await axios.get(`/api/wordbooks/${wordbookId}?includeWords=${includeWords}`);
  return response.data;
};

// 단어장 생성 API 함수 (관리자용)
export const createWordbook = async (title, description) => {
  const response = await axios.post('/api/wordbooks', null, {
    params: { title, description }
  });
  return response.data;
};

// 단어장 수정 API 함수 (관리자용)
export const updateWordbook = async (wordbookId, title, description) => {
  const response = await axios.put(`/api/wordbooks/${wordbookId}`, null, {
    params: { title, description }
  });
  return response.data;
};

// 단어장 삭제 API 함수 (관리자용)
export const deleteWordbook = async (wordbookId) => {
  const response = await axios.delete(`/api/wordbooks/${wordbookId}`);
  return response.data;
};
