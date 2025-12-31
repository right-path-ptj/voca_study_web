import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllWords,
  getWord,
  getWordsByWordbook,
  getWordsByWordbookAndDifficulty,
  createWord,
  updateWord,
  deleteWord,
} from '../api/word';

// 모든 단어 조회 액션
export const fetchAllWords = createAsyncThunk(
  'word/fetchAllWords',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllWords();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 단어 상세 조회 액션
export const fetchWord = createAsyncThunk(
  'word/fetchWord',
  async (wordId, { rejectWithValue }) => {
    try {
      const response = await getWord(wordId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 단어장별 단어 조회 액션
export const fetchWordsByWordbook = createAsyncThunk(
  'word/fetchWordsByWordbook',
  async (wordbookId, { rejectWithValue }) => {
    try {
      const response = await getWordsByWordbook(wordbookId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 단어장 및 난이도별 단어 조회 액션
export const fetchWordsByWordbookAndDifficulty = createAsyncThunk(
  'word/fetchWordsByWordbookAndDifficulty',
  async ({ wordbookId, difficulty }, { rejectWithValue }) => {
    try {
      const response = await getWordsByWordbookAndDifficulty(wordbookId, difficulty);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 단어 생성 액션
export const addWord = createAsyncThunk(
  'word/addWord',
  async (wordData, { rejectWithValue }) => {
    try {
      const response = await createWord(wordData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 단어 수정 액션
export const editWord = createAsyncThunk(
  'word/editWord',
  async ({ wordId, wordData }, { rejectWithValue }) => {
    try {
      const response = await updateWord(wordId, wordData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 단어 삭제 액션
export const removeWord = createAsyncThunk(
  'word/removeWord',
  async (wordId, { rejectWithValue }) => {
    try {
      await deleteWord(wordId);
      return wordId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 초기 상태 설정
const initialState = {
  words: [],
  currentWord: null,
  loading: false,
  error: null,
};

// 단어 슬라이스 생성
const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    clearCurrentWord: (state) => {
      state.currentWord = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 모든 단어 조회
      .addCase(fetchAllWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어 조회에 실패했습니다.';
      })
      
      // 단어 상세 조회
      .addCase(fetchWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWord.fulfilled, (state, action) => {
        state.currentWord = action.payload;
        state.loading = false;
      })
      .addCase(fetchWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어 조회에 실패했습니다.';
      })
      
      // 단어장별 단어 조회
      .addCase(fetchWordsByWordbook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWordsByWordbook.fulfilled, (state, action) => {
        state.words = action.payload;
        state.loading = false;
      })
      .addCase(fetchWordsByWordbook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어 조회에 실패했습니다.';
      })
      
      // 단어장 및 난이도별 단어 조회
      .addCase(fetchWordsByWordbookAndDifficulty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWordsByWordbookAndDifficulty.fulfilled, (state, action) => {
        state.words = action.payload;
        state.loading = false;
      })
      .addCase(fetchWordsByWordbookAndDifficulty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어 조회에 실패했습니다.';
      })
      
      // 단어 생성
      .addCase(addWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWord.fulfilled, (state, action) => {
        state.words.push(action.payload);
        state.loading = false;
      })
      .addCase(addWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어 생성에 실패했습니다.';
      })
      
      // 단어 수정
      .addCase(editWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editWord.fulfilled, (state, action) => {
        const index = state.words.findIndex(word => word.id === action.payload.id);
        if (index !== -1) {
          state.words[index] = action.payload;
        }
        state.currentWord = action.payload;
        state.loading = false;
      })
      .addCase(editWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어 수정에 실패했습니다.';
      })
      
      // 단어 삭제
      .addCase(removeWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWord.fulfilled, (state, action) => {
        state.words = state.words.filter(word => word.id !== action.payload);
        state.loading = false;
      })
      .addCase(removeWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '단어 삭제에 실패했습니다.';
      });
  },
});

export const { clearCurrentWord, clearError } = wordSlice.actions;
export default wordSlice.reducer;