import React from 'react';
import WordItem from './WordItem';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAdmin } from '../../utils/tokenUtils';
import './word.css';

function WordList({ words, onWordClick, showMeaning = true }) {
  const navigate = useNavigate();
  const isUserAdmin = isAdmin();
  
  // 단어 정렬 함수 (난이도 > 알파벳 순)
  const sortedWords = [...words].sort((a, b) => {
    const difficultyOrder = { EASY: 1, MEDIUM: 2, HARD: 3 };
    if (difficultyOrder[a.difficultyLevel] !== difficultyOrder[b.difficultyLevel]) {
      return difficultyOrder[a.difficultyLevel] - difficultyOrder[b.difficultyLevel];
    }
    return a.word.localeCompare(b.word);
  });
  
  return (
    <div className="word-list">
      <div className="word-list-header">
        <h2>단어 목록 ({words.length}개)</h2>
        {isUserAdmin && (
          <Button
            variant="secondary"
            onClick={() => navigate('/admin/words/add')}
          >
            단어 추가
          </Button>
        )}
      </div>
      
      {sortedWords.length === 0 ? (
        <div className="no-words">
          <p>등록된 단어가 없습니다.</p>
        </div>
      ) : (
        <div className="word-list-grid">
          {sortedWords.map((word) => (
            <WordItem
              key={word.id}
              word={word}
              onClick={() => onWordClick(word)}
              showMeaning={showMeaning}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WordList;