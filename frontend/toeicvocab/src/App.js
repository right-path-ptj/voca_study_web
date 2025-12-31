// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AppRouter from './router/AppRouter';
import authReducer from './slices/authSlice';
import wordReducer from './slices/wordSlice';
import wordbookReducer from './slices/wordbookSlice';
import testReducer from './slices/testSlice';
import postReducer from './slices/postSlice';
import commentReducer from './slices/commentSlice';
import './App.css';
import './common.css';

// 리덕스 스토어 설정
const store = configureStore({
  reducer: {
    auth: authReducer,
    word: wordReducer,
    wordbook: wordbookReducer,
    test: testReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
