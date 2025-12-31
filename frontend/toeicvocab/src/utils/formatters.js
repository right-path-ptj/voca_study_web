export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  
  // 점수 포맷팅 함수
  export const formatScore = (score) => {
    return score ? `${score}점` : '미응시';
  };
  
  // 정답률 포맷팅 함수
  export const formatCorrectRate = (correctCount, totalCount) => {
    if (!correctCount || !totalCount) return '0%';
    const rate = (correctCount / totalCount) * 100;
    return `${rate.toFixed(1)}%`;
  };
  
  // 난이도 한글 변환 함수
  export const formatDifficulty = (difficulty) => {
    const difficultyMap = {
      'EASY': '쉬움',
      'MEDIUM': '보통',
      'HARD': '어려움'
    };
    
    return difficultyMap[difficulty] || difficulty;
  };
  
  // 문자열 길이 제한 함수
  export const truncateString = (str, maxLength) => {
    if (!str) return '';
    
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    
    return str;
};