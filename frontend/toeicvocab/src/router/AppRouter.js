// src/router/AppRouter.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/authSlice';
import { getUserInfo, isLoggedIn, isAdmin } from '../utils/tokenUtils';

// 인증 페이지
import LoginPage from '../pages/auth/LoginPage';
import LogoutPage from '../pages/auth/LogoutPage';
import AdminLoginPage from '../pages/auth/AdminLoginPage';
import SignupPage from '../pages/auth/SignupPage';

// 홈 페이지
import HomePage from '../pages/home/HomePage';

// 단어장 페이지
import WordbookListPage from '../pages/wordbook/WordbookListPage';
import WordbookDetailPage from '../pages/wordbook/WordbookDetailPage';

// 테스트 페이지
import TestSelectionPage from '../pages/test/TestSelectionPage';
import TestPage from '../pages/test/TestPage';
import TestResultPage from '../pages/test/TestResultPage';
import TestHistoryPage from '../pages/test/TestHistoryPage';

// 게시글 페이지
import PostListPage from '../pages/post/PostListPage';
import PostDetailPage from '../pages/post/PostDetailPage';
import PostWritePage from '../pages/post/PostWritePage';
import PostEditPage from '../pages/post/PostEditPage';

// 관리자 페이지
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminWordManagePage from '../pages/admin/AdminWordManagePage';
import AdminWordAddPage from '../pages/admin/AdminWordAddPage';
import AdminWordEditPage from '../pages/admin/AdminWordEditPage';
import AdminWordbookManagePage from '../pages/admin/AdminWordbookManagePage';
import AdminWordbookAddPage from '../pages/admin/AdminWordbookAddPage';
import AdminWordbookEditPage from '../pages/admin/AdminWordbookEditPage';

// 사용자 인증 확인 라우트 wrapper
const PrivateRoute = ({ children }) => {
  const isUserLoggedIn = isLoggedIn();
  
  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// 관리자 인증 확인 라우트 wrapper
const AdminRoute = ({ children }) => {
  const isUserAdmin = isLoggedIn() && isAdmin();
  
  if (!isUserAdmin) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppRouter() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 불러오기
    const userInfo = getUserInfo();
    if (userInfo && isLoggedIn()) {
      dispatch(setUser(userInfo));
    }
  }, [dispatch]);
  
  return (
    <Router>
      <Routes>
        {/* 기본 페이지 */}
        <Route path="/" element={<HomePage />} />
        
        {/* 인증 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage  />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 단어장 페이지 */}
        <Route path="/wordbooks" element={<WordbookListPage />} />
        <Route path="/wordbooks/:wordbookId" element={<WordbookDetailPage />} />
        
        {/* 테스트 페이지 */}
        <Route path="/test" element={<TestSelectionPage />} />
        <Route 
          path="/test/start/:wordbookId" 
          element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/test/result/:wordbookId" 
          element={
            <PrivateRoute>
              <TestResultPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/test/result/:wordbookId/:resultId" 
          element={
            <PrivateRoute>
              <TestResultPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/test/history" 
          element={
            <PrivateRoute>
              <TestHistoryPage />
            </PrivateRoute>
          } 
        />
        
        {/* 게시글 페이지 */}
        <Route path="/posts" element={<PostListPage />} />
        <Route 
          path="/posts/write" 
          element={
            <PrivateRoute>
              <PostWritePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/posts/edit/:postId" 
          element={
            <PrivateRoute>
              <PostEditPage />
            </PrivateRoute>
          } 
        />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
        
        {/* 관리자 페이지 */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/words" 
          element={
            <AdminRoute>
              <AdminWordManagePage />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/words/add" 
          element={
            <AdminRoute>
              <AdminWordAddPage />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/words/edit/:wordId" 
          element={
            <AdminRoute>
              <AdminWordEditPage />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/wordbooks" 
          element={
            <AdminRoute>
              <AdminWordbookManagePage />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/wordbooks/add" 
          element={
            <AdminRoute>
              <AdminWordbookAddPage />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/wordbooks/edit/:wordbookId" 
          element={
            <AdminRoute>
              <AdminWordbookEditPage />
            </AdminRoute>
          } 
        />
        
        {/* 없는 페이지 처리 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;