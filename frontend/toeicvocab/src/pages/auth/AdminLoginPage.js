import React from 'react';
import AdminLoginForm from '../../components/auth/AdminLoginForm';
import BasicLayout from '../../layout/BasicLayout';

function AdminLoginPage() {
  return (
    <BasicLayout>
      <div className="auth-page admin-login-page">
        <div className="auth-container">
          <AdminLoginForm />
        </div>
      </div>
    </BasicLayout>
  );
}

export default AdminLoginPage;