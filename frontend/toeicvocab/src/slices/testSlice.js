import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWordsForTest, saveTestResult, getUserTestResults } from '../api/test';

// 테스트용 단어 조회 액션
export const fetchWordsForTest = createAsyncThunk(
  'test/fetchWordsForTest',
  async (wordbookId, { rejectWithValue }) => {
    try {
      const response = await getWordsForTest(wordbookId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 테스트 결과 저장 액션
export const submitTestResult = createAsyncThunk(
  'test/submitTestResult',
  async (testData, { rejectWithValue }) => {
    try {
      const response = await saveTestResult(testData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 사용자 테스트 결과 조회 액션
export const fetchUserTestResults = createAsyncThunk(
  'test/fetchUserTestResults',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserTestResults();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 초기 상태 설정
const initialState = {
  testWords: [],
  userAnswers: {},
  currentTestResult: null,
  testResults: [],
  loading: false,
  error: null,
  testInProgress: false,
};

// 테스트 슬라이스 생성
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setUserAnswer: (state, action) => {
      const { wordId, answer } = action.payload;
      state.userAnswers[wordId] = answer;
    },
    clearTestState: (state) => {
      state.testWords = [];
      state.userAnswers = {};
      state.currentTestResult = null;
      state.testInProgress = false;
    },
    startTest: (state) => {
      state.testInProgress = true;
      state.userAnswers = {};
      state.currentTestResult = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 테스트용 단어 조회
      .addCase(fetchWordsForTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWordsForTest.fulfilled, (state, action) => {
  console.log('테스트 단어 응답:', action.payload);
  
  // API 응답 구조 처리
  if (Array.isArray(action.payload)) {
    state.testWords = action.payload;
  } else if (action.payload && Array.isArray(action.payload.words)) {
    state.testWords = action.payload.words;
  } else if (action.payload && typeof action.payload === 'object') {
    // 객체의 프로퍼티 중 배열인 것을 찾아 사용
    const wordsArray = Object.values(action.payload).find(val => Array.isArray(val));
    if (wordsArray) {
      state.testWords = wordsArray;
    } else {
      console.error('단어 배열을 찾을 수 없습니다:', action.payload);
      state.testWords = [];
    }
  } else {
    console.error('예상치 못한 응답 형식:', action.payload);
    state.testWords = [];
  }
  
  console.log('처리된 testWords:', state.testWords);
  state.loading = false;
})
      .addCase(fetchWordsForTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '테스트 단어 조회에 실패했습니다.';
      })
      
      // 테스트 결과 저장
      .addCase(submitTestResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTestResult.fulfilled, (state, action) => {
        state.currentTestResult = action.payload;
        state.testInProgress = false;
        state.loading = false;
      })
      .addCase(submitTestResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '테스트 결과 저장에 실패했습니다.';
      })
      
      // 사용자 테스트 결과 조회
      .addCase(fetchUserTestResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTestResults.fulfilled, (state, action) => {
        state.testResults = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserTestResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '테스트 결과 조회에 실패했습니다.';
      });
  },
});

export const { setUserAnswer, clearTestState, startTest, clearError } = testSlice.actions;
export default testSlice.reducer;