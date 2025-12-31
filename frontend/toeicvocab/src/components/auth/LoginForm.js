import React, { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link, useNavigate } from 'react-router-dom';
  import { loginUser, clearError } from '../../slices/authSlice';
  import TextInput from '../common/TextInput';
  import Button from '../common/Button';
  import ErrorMessage from '../common/ErrorMessage';
  
  function LoginForm() {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
    
    useEffect(() => {
      // 이미 로그인되어 있다면 홈으로 리다이렉트
      if (isAuthenticated) {
        navigate('/');
      }
      
      // 컴포넌트 언마운트 시 에러 초기화
      return () => {
        dispatch(clearError());
      };
    }, [isAuthenticated, navigate, dispatch]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser(formData));
    };
    
    return (
      <div className="login-form">
        <h2>로그인</h2>
                <br/>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit}>
          <TextInput
            label="아이디"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            required
          />
          <TextInput
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="login-btn-full"
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
        <div className="login-links">
          <br/>
          <p>
            계정이 없으신가요? <a href="/signup">회원가입</a>
          </p>
        </div>
        <div className="auth-links">
          <p>관리자이신가요? <a href="/admin/login">관리자로그인</a></p>
        </div>
      </div>
    );
  }
  
  export default LoginForm;