import React from 'react';
import { formatDate } from '../../utils/formatters';

function WordbookItem({ wordbook, onClick }) {
  return (
    <div className="wordbook-item" onClick={onClick}>
      <h3 className="wordbook-title">{wordbook.title}</h3>
      {wordbook.description && (
        <p className="wordbook-description">{wordbook.description}</p>
      )}
      <div className="wordbook-info">
        <span className="wordbook-count">단어 수: {wordbook.wordCount}개</span>
        <span className="wordbook-date">
          생성일: {formatDate(wordbook.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default WordbookItem;