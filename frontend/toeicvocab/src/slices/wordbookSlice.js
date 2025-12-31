import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllWordbooks,
  getWordbook,
  createWordbook,
  updateWordbook,
  deleteWordbook,
} from '../api/wordbook';

// 모든 단어장 조회 액션
export const fetchAllWordbooks = createAsyncThunk(
  'wordbook/fetchAllWordbooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllWordbooks();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 단어장 상세 조회 액션
export const fetchWordbook = createAsyncThunk(
  'wordbook/fetchWordbook',
  async ({ wordbookId, includeWords }, { rejectWithValue }) => {
    try {
      const response = await getWordbook(wordbookId, includeWords);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 단어장 생성 액션
export const addWordbook = createAsyncThunk(
  'wordbook/addWordbook',
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const response = await createWordbook(title, description);
      return response;
    } catch (error) {
      // 오류 메시지만 추출하여 반환
      const errorMessage = 
        error.response?.data?.message || 
        (typeof error.response?.data === 'string' ? error.response.data : '단어장 생성에 실패했습니다.');
      return rejectWithValue(errorMessage);
    }
  }
);

// 단어장 수정 액션
export const editWordbook = createAsyncThunk(
  'wordbook/editWordbook',
  async ({ wordbookId, title, description }, { rejectWithValue }) => {
    try {
      const response = await updateWordbook(wordbookId, title, description);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 단어장 삭제 액션
export const removeWordbook = createAsyncThunk(
  'wordbook/removeWordbook',
  async (wordbookId, { rejectWithValue }) => {
    try {
      await deleteWordbook(wordbookId);
      return wordbookId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 초기 상태 설정
const initialState = {
  wordbooks: [],
  currentWordbook: null,
  loading: false,
  error: null,
};

// 단어장 슬라이스 생성
const wordbookSlice = createSlice({
  name: 'wordbook',
  initialState,
  reducers: {
    clearCurrentWordbook: (state) => {
      state.currentWordbook = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 모든 단어장 조회
      .addCase(fetchAllWordbooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWordbooks.fulfilled, (state, action) => {
        state.wordbooks = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllWordbooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어장 조회에 실패했습니다.';
      })
      
      // 단어장 상세 조회
      .addCase(fetchWordbook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWordbook.fulfilled, (state, action) => {
        state.currentWordbook = action.payload;
        state.loading = false;
      })
      .addCase(fetchWordbook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어장 조회에 실패했습니다.';
      })
      
      // 단어장 생성
      .addCase(addWordbook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWordbook.fulfilled, (state, action) => {
        state.wordbooks.push(action.payload);
        state.loading = false;
      })
      .addCase(addWordbook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어장 생성에 실패했습니다.';
      })
      
      // 단어장 수정
      .addCase(editWordbook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editWordbook.fulfilled, (state, action) => {
        const index = state.wordbooks.findIndex(wordbook => wordbook.id === action.payload.id);
        if (index !== -1) {
          state.wordbooks[index] = action.payload;
        }
        state.currentWordbook = action.payload;
        state.loading = false;
      })
      .addCase(editWordbook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어장 수정에 실패했습니다.';
      })
      
      // 단어장 삭제
      .addCase(removeWordbook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWordbook.fulfilled, (state, action) => {
        state.wordbooks = state.wordbooks.filter(wordbook => wordbook.id !== action.payload);
        state.loading = false;
      })
      .addCase(removeWordbook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어장 삭제에 실패했습니다.';
      });
  },
});

export const { clearCurrentWordbook, clearError } = wordbookSlice.actions;
export default wordbookSlice.reducer;