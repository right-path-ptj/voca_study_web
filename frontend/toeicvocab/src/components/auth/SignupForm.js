import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser, clearError } from '../../slices/authSlice';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  
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
    
    // 입력 값 변경 시 해당 필드의 에러 메시지 초기화
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (formData.username.length < 1 || formData.username.length > 20) {
      errors.username = '사용자 이름은 1-20자 이내여야 합니다.';
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '유효한 이메일 주소를 입력해주세요.';
    }
    
    if (formData.password.length < 1 || formData.password.length > 20) {
      errors.password = '비밀번호는 1-20자 이내여야 합니다.';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (validateForm()) {
      // 비밀번호 확인 필드 제외하고 데이터 전송
      const { confirmPassword, ...signupData } = formData;
      dispatch(signupUser(signupData))
        .unwrap()
        .then(() => {
          // 회원가입 성공 시 로그인 페이지로 이동
          navigate('/login', { state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' } });
        });
    }
  };
  
  return (
    <div className="signup-form">
      <h2>회원가입</h2>
              <br/>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="아이디"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="1-20자 이내의 아이디를 입력하세요"
          error={formErrors.username}
          required
        />
        <TextInput
          label="이메일"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일 주소를 입력하세요"
          error={formErrors.email}
          required
        />
        <TextInput
          label="비밀번호"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="4-20자 이내의 비밀번호를 입력하세요"
          error={formErrors.password}
          required
        />
        <TextInput
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
          error={formErrors.confirmPassword}
          required
        />
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="signup-btn-full"
        >
          {loading ? '가입 중...' : '회원가입'}
        </Button>
      </form>
      <div className="signup-links">
        <br/>
        <p>
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;