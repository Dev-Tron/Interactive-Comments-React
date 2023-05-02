import React, { useState } from 'react'
import styled from 'styled-components'
import plus from '../assets/images/icon-plus.svg'
import check from '../assets/images/icon-reply.svg'
import minus from '../assets/images/icon-minus.svg'
import pencil from '../assets/images/icon-edit.svg'
import trashcan from '../assets/images/icon-delete.svg'
import AddReply from './add-new-reply'
import Reply from './reply'
import { currentUser } from '../data'
import EditComment from './edit-comment'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const CommentBox = styled.div`
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 1440px) {
    flex-direction: row;
    gap: 25px;
  }
`


export default function Comment({ comment, commentData, setCommentData }) {
    const [showAddReply, setShowReply] = useState(false)
    const [showEditComment, setEditComment] = useState(false)
    const [show, setShow] = useState(false)
    
    const handleClose = () => setShow(false)

    /*  A function that takes in the kind of action, i.e.
          add or remove to decide whether to add to the current
          score or remove count from it.
      */
    const getNewScore = (action, score) => {
        if (action === 'add') {
            return score + 1
        }
        if (action === 'remove' && score !== 0) {
            return score - 1
        } else {
            // Here, we stop the user from going below 0, i.e. into negative integers.
            alert('Cannot reduce below 0.')
            return score
        }
    }

    /*  A handler function that is triggered when the plus
      or minus sign is clicked. We do the following:
        1. Iterate over all the comments in the state we created above.
        2. If the comment's ID matches the one our click handler provided, we change the score.
        3. If not, we simply return the comment as it was.
      At the end, we get a list of comments with the changed
      values according to whatever we clicked.
  */
    const handleCountChange = (action, commentId) => {
        const newComments = commentData.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    score: getNewScore(action, comment.score)
                }
            } else {
                return comment
            }
        })

        setCommentData(newComments)
    }

    const handleDeleteComment = (commentId) => {
        const newComments = commentData.filter((comment) => comment.id !== commentId)
        setCommentData(newComments)
    }

    const handleDeleteClick = () => {
        setShow(true)
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        NO, CANCEL
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteComment(comment.id)}>
                        YES, DELETE
                    </Button>
                </Modal.Footer>
            </Modal>
            <CommentBox className='comment-box'>
                <div className='counter-2'>
                    <img onClick={() => handleCountChange('add', comment.id)} src={plus} alt="positive-sign"></img>
                    <span>{comment.score}</span>
                    <img onClick={() => handleCountChange('remove', comment.id)} src={minus} alt="minus-sign"></img>
                </div>
                <div>
                    <div className='user-info-box'>
                        <img className='user-img' src={comment.user.image.png} alt="user"></img>
                        <div className='intro'>
                            <h1 className='username'>{comment.user.username}</h1>
                            <span className='date'>{comment.createdAt}</span>
                        </div>
                        {currentUser.username === comment.user.username ?
                        <div className="comment-actions-2">
                            <div className="delete-box" onClick={handleDeleteClick}>
                                <img className='delete-edit' src={trashcan} alt={trashcan}></img>
                                Delete
                            </div>
                            <div className="edit-box" onClick={() => setEditComment(!showEditComment)}>
                                <img className='delete-edit' src={pencil} alt={pencil}></img>
                                Edit
                            </div>
                        </div>
                        : <div className='reply-box-2' onClick={() => setShowReply(!showAddReply)}>
                            <img className='reply' src={check} alt="reply-check"></img>
                            Reply
                        </div>}
                    </div>
                    <div>
                        <p className='content'>{comment.content}</p>
                    </div>
                </div>
                <div className='counter-reply-buttons'>
                    <div className='counter'>
                        <img onClick={() => handleCountChange('add', comment.id)} src={plus} alt="positive-sign"></img>
                        <span>{comment.score}</span>
                        <img onClick={() => handleCountChange('remove', comment.id)} src={minus} alt="minus-sign"></img>
                    </div>
                    {currentUser.username === comment.user.username ?
                        <div className="comment-actions">
                            <div className="delete-box" onClick={handleDeleteClick}>
                                <img className='delete-edit' src={trashcan} alt={trashcan}></img>
                                Delete
                            </div>
                            <div className="edit-box" onClick={() => setEditComment(!showEditComment)}>
                                <img className='delete-edit' src={pencil} alt={pencil}></img>
                                Edit
                            </div>
                        </div>
                        : <div className='reply-box' onClick={() => setShowReply(!showAddReply)}>
                            <img className='reply' src={check} alt="reply-check"></img>
                            Reply
                        </div>}
                </div>
            </CommentBox>
            {showAddReply && <AddReply commentData={commentData} setCommentData={setCommentData} commentId={comment.id} setShowReply={setShowReply} />}
            {showEditComment && <EditComment commentData={commentData} setCommentData={setCommentData} commentId={comment.id} setEditComment={setEditComment} />}
            {comment.replies.map((reply) =>
                <Reply key={`reply-${reply.id}`} commentData={commentData} setCommentData={setCommentData} comment={comment} reply={reply} />
            )}
        </div>
    )
} 