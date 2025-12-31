import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllWordbooks, removeWordbook } from '../../slices/wordbookSlice';
import AdminLayout from '../../layout/AdminLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

function AdminWordbookManagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wordbooks, loading, error } = useSelector((state) => state.wordbook);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWordbookId, setSelectedWordbookId] = useState(null);
  
  useEffect(() => {
    dispatch(fetchAllWordbooks());
  }, [dispatch]);
  
  const handleAddWordbook = () => {
    navigate('/admin/wordbooks/add');
  };
  
  const handleEditWordbook = (wordbookId) => {
    navigate(`/admin/wordbooks/edit/${wordbookId}`);
  };
  
  const handleDeleteClick = (wordbookId) => {
    setSelectedWordbookId(wordbookId);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedWordbookId) {
      dispatch(removeWordbook(selectedWordbookId));
      setIsDeleteModalOpen(false);
      setSelectedWordbookId(null);
    }
  };
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <AdminLayout>
      <div className="admin-wordbook-manage">
        <div className="manage-header">
          <h1>단어장 관리</h1>
          <Button variant="primary" onClick={handleAddWordbook}>
            단어장 추가
          </Button>
        </div>
        
        <div className="wordbook-list-container">
          <table className="wordbook-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>제목</th>
                <th>설명</th>
                <th>단어 수</th>
                <th>생성일</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {wordbooks.length > 0 ? (
                wordbooks.map((wordbook) => (
                  <tr key={wordbook.id}>
                    <td>{wordbook.id}</td>
                    <td>{wordbook.title}</td>
                    <td className="description-cell">
                      {wordbook.description
                        ? wordbook.description.substring(0, 30) +
                          (wordbook.description.length > 30 ? '...' : '')
                        : '-'}
                    </td>
                    <td>{wordbook.wordCount}</td>
                    <td>{new Date(wordbook.createdAt).toLocaleDateString()}</td>
                    <td className="action-cell">
                      <Button
                        variant="small-secondary"
                        onClick={() => handleEditWordbook(wordbook.id)}
                      >
                        수정
                      </Button>
                      <Button
                        variant="small-danger"
                        onClick={() => handleDeleteClick(wordbook.id)}
                        disabled={wordbook.wordCount > 0}
                        title={
                          wordbook.wordCount > 0
                            ? '단어가 있는 단어장은 삭제할 수 없습니다.'
                            : ''
                        }
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    단어장이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="단어장 삭제"
        >
          <div className="delete-modal-content">
            <p>정말로 이 단어장을 삭제하시겠습니까?</p>
            <p>삭제된 단어장은 복구할 수 없습니다.</p>
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

export default AdminWordbookManagePage;