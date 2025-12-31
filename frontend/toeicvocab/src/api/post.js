// src/api/post.js
import axios from '../utils/axios';

// 모든 게시글 조회 API 함수
export const getAllPosts = async () => {
  const response = await axios.get('/api/posts');
  return response.data;
};

// 게시글 상세 조회 API 함수
export const getPost = async (postId) => {
  const response = await axios.get(`/api/posts/${postId}`);
  return response.data;
};

// 사용자 게시글 조회 API 함수
export const getUserPosts = async () => {
  const response = await axios.get('/api/posts/user');
  return response.data;
};

// 게시글 생성 API 함수
export const createPost = async (postData) => {
  const response = await axios.post('/api/posts', postData);
  return response.data;
};

// 게시글 수정 API 함수
export const updatePost = async (postId, postData) => {
  const response = await axios.put(`/api/posts/${postId}`, postData);
  return response.data;
};

// 게시글 삭제 API 함수
export const deletePost = async (postId) => {
  const response = await axios.delete(`/api/posts/${postId}`);
  return response.data;
};
