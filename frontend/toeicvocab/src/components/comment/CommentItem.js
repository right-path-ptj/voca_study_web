import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeComment } from '../../slices/commentSlice';
import { fetchPost } from '../../slices/postSlice'; // 게시글 다시 불러오기 위해 추가
import Button from '../common/Button';
import Modal from '../common/Modal';
import { formatDate } from '../../utils/formatters';
import './comment.css';

function CommentItem({ comment, postId }) { // postId 파라미터 추가
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const isAuthor = user && user.username === comment.username;
  
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    dispatch(removeComment(comment.id))
      .unwrap() // Promise를 반환하도록 unwrap() 추가
      .then(() => {
        // 댓글 삭제 후 게시글을 다시 불러와 최신 댓글 목록을 가져옴
        dispatch(fetchPost(postId));
      })
      .catch((error) => {
        console.error("댓글 삭제 실패:", error);
      });
    setIsDeleteModalOpen(false);
  };
  
  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-info">
          <span className="comment-author">{comment.username}</span>
          <span className="comment-date">{formatDate(comment.createdAt)}</span>
        </div>
        {isAuthor && (
          <Button
            variant="small-danger"
            onClick={handleDelete}
            className="comment-delete-btn"
          >
            삭제
          </Button>
        )}
      </div>
      
      <div className="comment-content">
        {comment.content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="댓글 삭제"
      >
        <div className="delete-modal-content">
          <p>정말로 이 댓글을 삭제하시겠습니까?</p>
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
  );
}

export default CommentItem;