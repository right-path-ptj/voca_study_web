import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchWordbook } from '../../slices/wordbookSlice';
import AdminLayout from '../../layout/AdminLayout';
import WordbookForm from '../../components/wordbook/WordbookForm';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

function AdminWordbookEditPage() {
  const { wordbookId } = useParams();
  const dispatch = useDispatch();
  const { currentWordbook, loading, error } = useSelector((state) => state.wordbook);
  
  useEffect(() => {
    dispatch(fetchWordbook({ wordbookId, includeWords: false }));
  }, [dispatch, wordbookId]);
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  if (!currentWordbook) {
    return (
      <AdminLayout>
        <div className="admin-wordbook-edit">
          <ErrorMessage message="단어장을 찾을 수 없습니다." />
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="admin-wordbook-edit">
        <WordbookForm wordbook={currentWordbook} isEditing={true} />
      </div>
    </AdminLayout>
  );
}

export default AdminWordbookEditPage;