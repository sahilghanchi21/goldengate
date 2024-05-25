import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import "./CommentModal.css"

Modal.setAppElement('#root');

const CommentModal = ({ isOpen, onRequestClose, post, comments, fetchedProfile, commentTexts, handleCommentChange, handleCommentSubmit }) => {
    const [localCommentText, setLocalCommentText] = useState('');

    const handleSubmit = () => {
        handleCommentSubmit(post.postId, localCommentText);
        setLocalCommentText('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Comments Modal"
            className="comment-modal"
            overlayClassName="comment-modal-overlay"
        >
            <div className="comment-modal-content">
                <div className="comment-modal-left">
                    <img src={fetchedProfile?.avatar} alt="User Profile" className="profile-pic" />
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={localCommentText}
                        onChange={(event) => setLocalCommentText(event.target.value)}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                <div className="comment-modal-right">
                    {comments?.map((comment, idx) => (
                        <div key={idx} className="comment">
                            <img src={comment.userAvatar} alt="User Avatar" className="comment-avatar" />
                            <div className="comment-details">
                                <div className="comment-username">{comment.username}</div>
                                <div className="comment-content">{comment.content}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default CommentModal;
