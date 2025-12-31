// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup, adminLogin } from '../api/auth';
import { saveToken, saveUserInfo, removeToken, removeUserInfo } from '../utils/tokenUtils';

// 로그인 액션 생성
export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await login(loginData);
      saveToken(response.accessToken);
      saveUserInfo({
        username: response.username,
        isAdmin: response.isAdmin
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 관리자 로그인 액션 생성
export const loginAdmin = createAsyncThunk(
  'auth/adminLogin',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await adminLogin(loginData);
      saveToken(response.accessToken);
      saveUserInfo({
        username: response.username,
        isAdmin: response.isAdmin
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 회원가입 액션 생성
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signup(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 로그아웃 액션 생성
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    removeToken();
    removeUserInfo();
    return null;
  }
);

// 초기 상태 설정
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  loading: false,
  error: null,
};

// 인증 슬라이스 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = action.payload.isAdmin;
    },
  },
  extraReducers: (builder) => {
    builder
      // 로그인 요청 시작
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 로그인 성공
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = {
          username: action.payload.username,
          isAdmin: action.payload.isAdmin,
        };
        state.isAdmin = action.payload.isAdmin;
        state.loading = false;
      })
      // 로그인 실패
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '로그인에 실패했습니다.';
      })
      // 관리자 로그인 요청 시작
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 관리자 로그인 성공
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = {
          username: action.payload.username,
          isAdmin: action.payload.isAdmin,
        };
        state.isAdmin = action.payload.isAdmin;
        state.loading = false;
      })
      // 관리자 로그인 실패
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '관리자 로그인에 실패했습니다.';
      })
      // 회원가입 요청 시작
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 회원가입 성공
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      // 회원가입 실패
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '회원가입에 실패했습니다.';
      })
      // 로그아웃 성공
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isAdmin = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;