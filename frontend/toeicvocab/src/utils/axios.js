import axios from 'axios';
import { getToken, removeToken } from './tokenUtils';

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 인증 오류 시 토큰 제거 및 로그인 페이지로 이동
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;