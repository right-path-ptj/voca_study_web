import axios from '../utils/axios';

// 회원가입 API 함수
export const signup = async (userData) => {
  const response = await axios.post('/api/auth/signup', userData);
  return response.data;
};

// 일반 사용자 로그인 API 함수
export const login = async (loginData) => {
  const response = await axios.post('/api/auth/login', loginData);
  return response.data;
};

// 관리자 로그인 API 함수
export const adminLogin = async (loginData) => {
  const response = await axios.post('/api/auth/admin/login', loginData);
  return response.data;
};