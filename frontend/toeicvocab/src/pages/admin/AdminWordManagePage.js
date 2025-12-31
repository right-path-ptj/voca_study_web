import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllWords, removeWord } from '../../slices/wordSlice';
import AdminLayout from '../../layout/AdminLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import WordSearch from '../../components/word/WordSearch';

function AdminWordManagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { words, loading, error } = useSelector((state) => state.word);
  
  const [searchParams, setSearchParams] = useState({ term: '', difficulty: '' });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 10;
  
  useEffect(() => {
    dispatch(fetchAllWords());
  }, [dispatch]);
  
  const handleSearch = (params) => {
    setSearchParams(params);
    setCurrentPage(1);
  };
  
  const handleAddWord = () => {
    navigate('/admin/words/add');
  };
  
  const handleEditWord = (wordId) => {
    navigate(`/admin/words/edit/${wordId}`);
  };
  
  const handleDeleteClick = (wordId) => {
    setSelectedWordId(wordId);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedWordId) {
      dispatch(removeWord(selectedWordId));
      setIsDeleteModalOpen(false);
      setSelectedWordId(null);
    }
  };
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
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
  
  // 페이지네이션
  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = filteredWords.slice(indexOfFirstWord, indexOfLastWord);
  const totalPages = Math.ceil(filteredWords.length / wordsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <AdminLayout>
      <div className="admin-word-manage">
        <div className="manage-header">
          <h1>단어 관리</h1>
          <Button variant="primary" onClick={handleAddWord}>
            단어 추가
          </Button>
        </div>
        
        <WordSearch onSearch={handleSearch} />
        
        <div className="word-list-container">
          <table className="word-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>단어</th>
                <th>의미</th>
                <th>예문</th>
                <th>난이도</th>
                <th>단어장</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {currentWords.length > 0 ? (
                currentWords.map((word) => (
                  <tr key={word.id}>
                    <td>{word.id}</td>
                    <td>{word.word}</td>
                    <td>{word.meaning}</td>
                    <td className="example-cell">
                      {word.example ? word.example.substring(0, 30) + (word.example.length > 30 ? '...' : '') : '-'}
                    </td>
                    <td>
                      {word.difficultyLevel === 'EASY'
                        ? '쉬움'
                        : word.difficultyLevel === 'MEDIUM'
                        ? '보통'
                        : '어려움'}
                    </td>
                    <td>{word.wordbookTitle}</td>
                    <td className="action-cell">
                      <Button
                        variant="small-secondary"
                        onClick={() => handleEditWord(word.id)}
                      >
                        수정
                      </Button>
                      <Button
                        variant="small-danger"
                        onClick={() => handleDeleteClick(word.id)}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    단어가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {totalPages > 1 && (
            <div className="pagination">
              <Button
                variant="small-secondary"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'small-primary' : 'small-secondary'}
                  onClick={() => paginate(page)}
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="small-secondary"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </Button>
            </div>
          )}
        </div>
        
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="단어 삭제"
        >
          <div className="delete-modal-content">
            <p>정말로 이 단어를 삭제하시겠습니까?</p>
            <p>삭제된 단어는 복구할 수 없습니다.</p>
            <div className="modal-actions">
              <Button
                variant="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                취소
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                삭제
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
}

export default AdminWordManagePage;