import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllWordbooks } from '../../slices/wordbookSlice';
import BasicLayout from '../../layout/BasicLayout';
import WordbookList from '../../components/wordbook/WordbookList';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import './wordbook.css';

function WordbookListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wordbooks, loading, error } = useSelector((state) => state.wordbook);
  
  useEffect(() => {
    dispatch(fetchAllWordbooks());
  }, [dispatch]);
  
  const handleWordbookClick = (wordbook) => {
    navigate(`/wordbooks/${wordbook.id}`);
  };
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <BasicLayout>
      <div className="wordbook-list-page">
        <h1>단어장 목록</h1>
        <WordbookList
          wordbooks={wordbooks}
          onWordbookClick={handleWordbookClick}
        />
      </div>
    </BasicLayout>
  );
}

export default WordbookListPage;