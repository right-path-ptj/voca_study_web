// src/pages/LogoutPage.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser());
    navigate('/login');
  }, [dispatch, navigate]);

  return null; // 로그아웃 처리 후 바로 리다이렉트
}

export default LogoutPage;
