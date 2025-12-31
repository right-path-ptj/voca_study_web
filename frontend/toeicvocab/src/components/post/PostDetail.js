// src/components/post/PostDetail.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removePost } from '../../slices/postSlice';
import CommentList from '../comment/CommentList';
import CommentForm from '../comment/CommentForm';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { formatDate } from '../../utils/formatters';

function PostDetail({ post }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const isAuthor = user && user.username === post.username;
  
  const handleEdit = () => {
    navigate(`/posts/edit/${post.id}`);
  };
  
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    dispatch(removePost(post.id))
      .unwrap()
      .then(() => {
        navigate('/posts');
      });
    setIsDeleteModalOpen(false);
  };
  
  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <h2 className="post-detail-title">{post.title}</h2>
        <div className="post-detail-info">
          <span className="post-detail-author">{post.username}</span>
          <span className="post-detail-date">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      
      <div className="post-detail-content">
        {post.content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      
      {isAuthor && (
        <div className="post-detail-actions">
          <Button variant="secondary" onClick={handleEdit}>
            수정
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      )}
      
      <div className="post-detail-comments">
  <h3>댓글 {post.commentCount}개</h3>
  <CommentForm postId={post.id} />
  <CommentList comments={post.comments || []} postId={post.id} /> {/* postId 전달 */}
</div>
      
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="게시글 삭제"
      >
        <div className="delete-modal-content">
          <p>정말로 이 게시글을 삭제하시겠습니까?</p>
          <p>삭제된 게시글은 복구할 수 없습니다.</p>
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

export default PostDetail;