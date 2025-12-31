import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { isAdmin } from '../utils/tokenUtils';
import './admin.css';

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  // 관리자 권한 확인
  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="admin-layout">
      <Header />
      <div className="admin-container">
        <aside className="admin-sidebar">
  <h2>관리자 메뉴</h2>
  <nav className="admin-nav">
    <ul className="admin-nav-list">
      <li className="admin-nav-item">
        <Link to="/admin" className="admin-nav-link">
          대시보드
        </Link>
      </li>
      <li className="admin-nav-item">
        <Link to="/admin/wordbooks" className="admin-nav-link">
          단어장 관리
        </Link>
      </li>
      <li className="admin-nav-item">
        <Link to="/admin/words" className="admin-nav-link">
          단어 관리
        </Link>
      </li>
    </ul>
  </nav>
</aside>
        <main className="admin-main">
          <div className="admin-content">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;