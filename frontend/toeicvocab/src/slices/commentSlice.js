// src/slices/commentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCommentsByPost,
  getCommentsByUser,
  createComment,
  deleteComment,
} from '../api/comment';

// 게시글별 댓글 조회 액션
export const fetchCommentsByPost = createAsyncThunk(
  'comment/fetchCommentsByPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await getCommentsByPost(postId);
      return { postId, comments: response };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 사용자별 댓글 조회 액션
export const fetchCommentsByUser = createAsyncThunk(
  'comment/fetchCommentsByUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCommentsByUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 댓글 생성 액션
export const addComment = createAsyncThunk(
  'comment/addComment',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await createComment(commentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 댓글 삭제 액션
export const removeComment = createAsyncThunk(
  'comment/removeComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await deleteComment(commentId);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 초기 상태 설정
const initialState = {
  commentsByPost: {}, // 게시글 ID별 댓글 목록
  userComments: [],  // 사용자 댓글 목록
  loading: false,
  error: null,
};

// 댓글 슬라이스 생성
const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 게시글별 댓글 조회
      .addCase(fetchCommentsByPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.commentsByPost[postId] = comments;
        state.loading = false;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '댓글 조회에 실패했습니다.';
      })
      
      // 사용자별 댓글 조회
      .addCase(fetchCommentsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByUser.fulfilled, (state, action) => {
        state.userComments = action.payload;
        state.loading = false;
      })
      .addCase(fetchCommentsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '사용자 댓글 조회에 실패했습니다.';
      })
      
      // 댓글 생성
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const postId = action.payload.postId;
        
        // 게시글별 댓글 목록에 새 댓글 추가
        if (state.commentsByPost[postId]) {
          state.commentsByPost[postId].push(action.payload);
        } else {
          state.commentsByPost[postId] = [action.payload];
        }
        
        // 사용자 댓글 목록에 새 댓글 추가
        state.userComments.push(action.payload);
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '댓글 생성에 실패했습니다.';
      })
      
      // 댓글 삭제
      .addCase(removeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        // 게시글별 댓글 목록에서 삭제
        Object.keys(state.commentsByPost).forEach(postId => {
          state.commentsByPost[postId] = state.commentsByPost[postId].filter(
            comment => comment.id !== action.payload
          );
        });
        
        // 사용자 댓글 목록에서 삭제
        state.userComments = state.userComments.filter(
          comment => comment.id !== action.payload
        );
        
        state.loading = false;
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '댓글 삭제에 실패했습니다.';
      });
  },
});

export const { clearError } = commentSlice.actions;
export default commentSlice.reducer;
