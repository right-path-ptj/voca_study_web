import React from 'react';

function ErrorMessage({ message }) {
  // 메시지가 객체인 경우 처리
  const errorText = typeof message === 'object' 
    ? (message.message || JSON.stringify(message)) 
    : message || '오류가 발생했습니다.';
    
  return (
    <div className="error-message">
      <div className="error-icon">!</div>
      <p className="error-text">{errorText}</p>
    </div>
  );
}

export default ErrorMessage;