import axios from '../utils/axios';

// 게시글별 댓글 조회 API 함수
export const getCommentsByPost = async (postId) => {
  const response = await axios.get(`/api/comments/post/${postId}`);
  return response.data;
};

// 사용자별 댓글 조회 API 함수
export const getCommentsByUser = async () => {
  const response = await axios.get('/api/comments/user');
  return response.data;
};

// 댓글 생성 API 함수
export const createComment = async (commentData) => {
  const response = await axios.post('/api/comments', commentData);
  return response.data;
};

// 댓글 삭제 API 함수
export const deleteComment = async (commentId) => {
  const response = await axios.delete(`/api/comments/${commentId}`);
  return response.data;
};
