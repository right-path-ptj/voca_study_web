import React from 'react';
import AdminLayout from '../../layout/AdminLayout';
import WordbookForm from '../../components/wordbook/WordbookForm';

function AdminWordbookAddPage() {
  return (
    <AdminLayout>
      <div className="admin-wordbook-add">
        <WordbookForm />
      </div>
    </AdminLayout>
  );
}

export default AdminWordbookAddPage;