// src/slices/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllPosts,
  getPost,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} from '../api/post';

// 모든 게시글 조회 액션
export const fetchAllPosts = createAsyncThunk(
  'post/fetchAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 게시글 상세 조회 액션
export const fetchPost = createAsyncThunk(
  'post/fetchPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await getPost(postId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 사용자 게시글 조회 액션
export const fetchUserPosts = createAsyncThunk(
  'post/fetchUserPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 게시글 생성 액션
export const addPost = createAsyncThunk(
  'post/addPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 게시글 수정 액션
export const editPost = createAsyncThunk(
  'post/editPost',
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await updatePost(postId, postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 게시글 삭제 액션
export const removePost = createAsyncThunk(
  'post/removePost',
  async (postId, { rejectWithValue }) => {
    try {
      await deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 초기 상태 설정
const initialState = {
  posts: [],
  userPosts: [],
  currentPost: null,
  loading: false,
  error: null,
};

// 게시글 슬라이스 생성
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 모든 게시글 조회
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '게시글 조회에 실패했습니다.';
      })
      
      // 게시글 상세 조회
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.currentPost = action.payload;
        state.loading = false;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '게시글 조회에 실패했습니다.';
      })
      
      // 사용자 게시글 조회
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '사용자 게시글 조회에 실패했습니다.';
      })
      
      // 게시글 생성
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.userPosts.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '게시글 생성에 실패했습니다.';
      })
      
      // 게시글 수정
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        // 전체 게시글 목록 업데이트
        const postIndex = state.posts.findIndex(post => post.id === action.payload.id);
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
        
        // 사용자 게시글 목록 업데이트
        const userPostIndex = state.userPosts.findIndex(post => post.id === action.payload.id);
        if (userPostIndex !== -1) {
          state.userPosts[userPostIndex] = action.payload;
        }
        
        state.currentPost = action.payload;
        state.loading = false;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '게시글 수정에 실패했습니다.';
      })
      
      // 게시글 삭제
      .addCase(removePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
        state.userPosts = state.userPosts.filter(post => post.id !== action.payload);
        state.loading = false;
      })
      .addCase(removePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '게시글 삭제에 실패했습니다.';
      });
  },
});

export const { clearCurrentPost, clearError } = postSlice.actions;
export default postSlice.reducer;