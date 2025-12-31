import axios from '../utils/axios';

// 모든 단어 조회 API 함수 (관리자용)
export const getAllWords = async () => {
  const response = await axios.get('/api/words');
  return response.data;
};

// 단어 상세 조회 API 함수
export const getWord = async (wordId) => {
  const response = await axios.get(`/api/words/public/${wordId}`);
  return response.data;
};

// 단어장별 단어 조회 API 함수
export const getWordsByWordbook = async (wordbookId) => {
  const response = await axios.get(`/api/words/public/wordbook/${wordbookId}`);
  return response.data;
};

// 단어장 및 난이도별 단어 조회 API 함수
export const getWordsByWordbookAndDifficulty = async (wordbookId, difficulty) => {
  const response = await axios.get(`/api/words/public/wordbook/${wordbookId}/difficulty/${difficulty}`);
  return response.data;
};

// 단어 생성 API 함수 (관리자용)
export const createWord = async (wordData) => {
  const response = await axios.post('/api/words', wordData);
  return response.data;
};

// 단어 수정 API 함수 (관리자용)
export const updateWord = async (wordId, wordData) => {
  const response = await axios.put(`/api/words/${wordId}`, wordData);
  return response.data;
};

// 단어 삭제 API 함수 (관리자용)
export const deleteWord = async (wordId) => {
  const response = await axios.delete(`/api/words/${wordId}`);
  return response.data;
};
