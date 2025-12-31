import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import './word.css';

function WordSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      term: searchTerm.trim(),
      difficulty: selectedDifficulty,
    });
  };
  
  const handleReset = () => {
    setSearchTerm('');
    setSelectedDifficulty('');
    onSearch({ term: '', difficulty: '' });
  };
  
  return (
    <div className="word-search">
      <form onSubmit={handleSubmit} className="search-form">
        <TextInput
          name="searchTerm"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="단어 또는 의미 검색"
        />
        
        <div className="select-group">
          <select
            name="difficulty"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="difficulty-select"
          >
            <option value="">모든 난이도</option>
            <option value="EASY">쉬움</option>
            <option value="MEDIUM">보통</option>
            <option value="HARD">어려움</option>
          </select>
        </div>
        
        <div className="search-buttons">
          <Button type="submit" variant="primary">
            검색
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            초기화
          </Button>
        </div>
      </form>
    </div>
  );
}

export default WordSearch;