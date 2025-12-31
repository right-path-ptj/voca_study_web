import React from 'react';
import { formatDifficulty } from '../../utils/formatters';
import './word.css';

function WordItem({ word, onClick, showMeaning = true }) {
  const difficultyClass = `difficulty-${word.difficultyLevel.toLowerCase()}`;
  
  return (
    <div className={`word-item ${difficultyClass}`} onClick={onClick}>
      <div className="word-header">
        <h3 className="word-text">{word.word}</h3>
        <span className="word-difficulty">{formatDifficulty(word.difficultyLevel)}</span>
      </div>
      {showMeaning && (
        <div className="word-body">
          <p className="word-meaning">{word.meaning}</p>
          {word.example && <p className="word-example">"{word.example}"</p>}
        </div>
      )}
    </div>
  );
}

export default WordItem;