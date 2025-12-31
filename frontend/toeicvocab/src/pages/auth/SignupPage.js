import React from 'react';
import SignupForm from '../../components/auth/SignupForm';
import BasicLayout from '../../layout/BasicLayout';

function SignupPage() {
  return (
    <BasicLayout>
      <div className="auth-page signup-page">
        <div className="auth-container">
          <SignupForm />
        </div>
      </div>
    </BasicLayout>
  );
}

export default SignupPage;