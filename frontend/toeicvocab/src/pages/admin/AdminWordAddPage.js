// src/pages/admin/AdminWordAddPage.js
import React from 'react';
import AdminLayout from '../../layout/AdminLayout';
import WordForm from '../../components/word/WordForm';

function AdminWordAddPage() {
  return (
    <AdminLayout>
      <div className="admin-word-add">
        <WordForm />
      </div>
    </AdminLayout>
  );
}

export default AdminWordAddPage;