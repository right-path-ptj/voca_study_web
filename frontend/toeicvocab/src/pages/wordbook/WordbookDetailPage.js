import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWordbook } from '../../slices/wordbookSlice';
import { fetchWordsByWordbook } from '../../slices/wordSlice';
import BasicLayout from '../../layout/BasicLayout';
import WordList from '../../components/word/WordList';
import WordSearch from '../../components/word/WordSearch';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import Modal from '../../components/common/Modal';
import './wordbook.css';

function WordbookDetailPage() {
  const { wordbookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useState({ term: '', difficulty: '' });
  const [isWordModalOpen, setIsWordModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  
  const { currentWordbook, loading: wordbookLoading, error: wordbookError } = useSelector((state) => state.wordbook);
  const { words, loading: wordsLoading, error: wordsError } = useSelector((state) => state.word);
  
  useEffect(() => {
    dispatch(fetchWordbook({ wordbookId, includeWords: false }));
    dispatch(fetchWordsByWordbook(wordbookId));
  }, [dispatch, wordbookId]);
  
  const loading = wordbookLoading || wordsLoading;
  const error = wordbookError || wordsError;
  
  const handleSearch = (params) => {
    setSearchParams(params);
  };
  
  const handleWordClick = (word) => {
    setSelectedWord(word);
    setIsWordModalOpen(true);
  };
  
  const handleStartTest = () => {
    navigate(`/test/start/${wordbookId}`);
  };
  
  // 검색 조건에 맞는 단어 필터링
  const filteredWords = words.filter((word) => {
    // 검색어 필터링
    const termMatch = !searchParams.term || 
      word.word.toLowerCase().includes(searchParams.term.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchParams.term.toLowerCase());
    
    // 난이도 필터링
    const difficultyMatch = !searchParams.difficulty || 
      word.difficultyLevel === searchParams.difficulty;
    
    return termMatch && difficultyMatch;
  });
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!currentWordbook) return <ErrorMessage message="단어장을 찾을 수 없습니다." />;
  
  return (
    <BasicLayout>
      <div className="wordbook-detail-page">
        <div className="wordbook-header">
          <h1>{currentWordbook.title}</h1>
          {currentWordbook.description && (
            <p className="wordbook-description">{currentWordbook.description}</p>
          )}
          <div className="wordbook-actions">
            <Button
              variant="primary"
              onClick={handleStartTest}
              disabled={words.length === 0}
            >
              테스트 시작
            </Button>
          </div>
        </div>
        
        <WordSearch onSearch={handleSearch} />
        
        <WordList
          words={filteredWords}
          onWordClick={handleWordClick}
        />
        
        {isWordModalOpen && selectedWord && (
          <Modal
            isOpen={isWordModalOpen}
            onClose={() => setIsWordModalOpen(false)}
            title="단어 상세"
          >
            <div className="word-detail">
              <h2 className="word-detail-text">{selectedWord.word}</h2>
              <div className="word-detail-meaning">
                <strong>의미:</strong> {selectedWord.meaning}
              </div>
              {selectedWord.example && (
                <div className="word-detail-example">
                  <strong>예문:</strong> "{selectedWord.example}"
                </div>
              )}
              <div className="word-detail-info">
                <span className="word-detail-difficulty">
                  난이도: {selectedWord.difficultyLevel === 'EASY' ? '쉬움' : 
                           selectedWord.difficultyLevel === 'MEDIUM' ? '보통' : '어려움'}
                </span>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </BasicLayout>
  );
}

export default WordbookDetailPage;