import React from 'react';
import WordbookItem from './WordbookItem';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAdmin } from '../../utils/tokenUtils';

function WordbookList({ wordbooks, onWordbookClick }) {
  const navigate = useNavigate();
  const isUserAdmin = isAdmin();
  
  return (
    <div className="wordbook-list">
      <div className="wordbook-list-header">
        <h2>단어장 목록 ({wordbooks.length}개)</h2>
        {isUserAdmin && (
          <Button
            variant="secondary"
            onClick={() => navigate('/admin/wordbooks/add')}
          >
            단어장 추가
          </Button>
        )}
      </div>
      
      {wordbooks.length === 0 ? (
        <div className="no-wordbooks">
          <p>등록된 단어장이 없습니다.</p>
        </div>
      ) : (
        <div className="wordbook-list-grid">
          {wordbooks.map((wordbook) => (
            <WordbookItem
              key={wordbook.id}
              wordbook={wordbook}
              onClick={() => onWordbookClick(wordbook)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WordbookList;