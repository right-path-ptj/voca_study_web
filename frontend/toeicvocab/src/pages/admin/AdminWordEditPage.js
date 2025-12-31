import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchWord } from '../../slices/wordSlice';
import AdminLayout from '../../layout/AdminLayout';
import WordForm from '../../components/word/WordForm';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

function AdminWordEditPage() {
  const { wordId } = useParams();
  const dispatch = useDispatch();
  const { currentWord, loading, error } = useSelector((state) => state.word);
  
  useEffect(() => {
    dispatch(fetchWord(wordId));
  }, [dispatch, wordId]);
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  if (!currentWord) {
    return (
      <AdminLayout>
        <div className="admin-word-edit">
          <ErrorMessage message="단어를 찾을 수 없습니다." />
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="admin-word-edit">
        <WordForm word={currentWord} isEditing={true} />
      </div>
    </AdminLayout>
  );
}

export default AdminWordEditPage;