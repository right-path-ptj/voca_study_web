import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/authSlice';
import { isAdmin } from '../../utils/tokenUtils';

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">TOEIC 단어 학습</Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">홈</Link>
            </li>
            <li className="nav-item">
              <Link to="/wordbooks">단어장</Link>
            </li>
            <li className="nav-item">
              <Link to="/test">테스트</Link>
            </li>
            <li className="nav-item">
              <Link to="/posts">게시판</Link>
            </li>
            {isAuthenticated && isAdmin() && (
              <li className="nav-item">
                <Link to="/admin">관리자</Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="auth-container">
          {isAuthenticated ? (
            <>
              <span className="username">{user?.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                로그인
              </Link>
              <Link to="/signup" className="signup-btn">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;