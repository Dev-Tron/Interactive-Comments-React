import styled from 'styled-components'
import plus from '../assets/images/icon-plus.svg'
import minus from '../assets/images/icon-minus.svg'
import { currentUser } from '../data'
import trashcan from '../assets/images/icon-delete.svg'
import pencil from '../assets/images/icon-edit.svg'
import { useState } from 'react'
import EditReply from './edit-reply'
import check from '../assets/images/icon-reply.svg'
import AddReply from './add-new-reply'
import { Modal, Button } from 'react-bootstrap'

export const CommentBox = styled.div`
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`

const ReplyBox = styled(CommentBox)`
@media (min-width: 1440px) {
    flex-direction: row;
    gap: 25px;
  }
`

const ReplyTo = styled.span`
  margin-right: 4px;
  color: hsl(238, 40%, 52%);
  font-weight: 500;
`

const You = styled.div`
  font-weight: 500;
  color: white;
  background-color: hsl(238, 40%, 52%);
  padding: 0 0.4rem;
  font-size: .8rem;
  border-radius: 2px;
  height: 20px;
`

const EditDelete = styled.div`
  display: flex;
  margin-top:  3%;
  gap: 15px;
`

const EditDelete2 = styled(EditDelete)`
    margin-top: 1%;
  @media (max-width: 1439px) {
    display: none;
  }
`

export default function Reply({ commentData, setCommentData, comment, reply }) {
    const [showEditReply, setEditReply] = useState(false)
    const [showAddReply, setShowReply] = useState(false)
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

    /* Added this function to handle replies. Score logic is the same but we're looping the replies to check the replyId as well. */
    const handleReplyCountChange = (action, commentId, replyId) => {
        const newComments = commentData.map((comment) => {
            if (comment.id === commentId) {
                const replies = comment.replies.map((reply) => {
                    if (reply.id === replyId) {
                        return {
                            ...reply,
                            score: getNewScore(action, reply.score)
                        }
                    } else {
                        return reply
                    }
                })
                return {
                    ...comment,
                    replies
                }
            } else {
                return comment
            }
        })

        setCommentData(newComments)
    }

    const handleDeleteReply = (commentId, replyId) => {
        const newComments = commentData.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: comment.replies.filter((reply) => reply.id !== replyId)
                }
            } else {
                return comment
            }
        });
        setCommentData(newComments)
    }

    const handleDeleteClick = () => {
        setShow(true)
    }

    return (
        <>
            <div className='reply-container'>
                <ReplyBox key={reply.id}>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Reply</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this reply? This will remove the comment and can't be undone.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                NO, CANCEL
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteReply(comment.id, reply.id)}>
                                YES, DELETE
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className='counter-2'>
                        <img onClick={() => handleReplyCountChange('add', comment.id, reply.id)} src={plus} alt="positive-sign"></img>
                        <span>{reply.score}</span>
                        <img onClick={() => handleReplyCountChange('remove', comment.id, reply.id)} src={minus} alt="minus-sign"></img>
                    </div>
                    <div>
                        <div className='user-info-box'>
                            <img className='user-img' src={reply.user.image.png} alt="user"></img>
                            <div className='intro'>
                                <h1 className='username'>{reply.user.username}</h1>
                                {reply.user.username === "juliusomo" && <You>you</You>}
                                <span className='date'>{reply.createdAt}</span>
                            </div>
                            {reply.user.username === currentUser.username ? <EditDelete2>
                            <div className='reply-action' onClick={() => handleDeleteClick()}  >
                                <img className='delete-edit' src={trashcan} alt={trashcan}>
                                </img>
                                <span style={{ color: 'hsl(358, 79%, 66%)', fontWeight: '500' }}>
                                    Delete
                                </span>
                            </div>
                            <div className='reply-action' onClick={() => setEditReply(!showEditReply)}>
                                <img className='delete-edit' src={pencil} alt={pencil}></img>
                                <span style={{ color: 'hsl(238, 40%, 52%)', fontWeight: '500' }}>
                                    Edit
                                </span>
                            </div>
                            </EditDelete2>
                            : <div className='reply-box-3' onClick={() => setShowReply(!showAddReply)}>
                                <img className='reply' src={check} alt="reply-check"></img>
                                Reply
                            </div>}
                        </div>
                        <p className='content'><ReplyTo>@{reply.replyingTo}</ReplyTo>
                            {reply.content}
                        </p>
                    </div>
                    <div className='counter-reply-buttons'>
                        <div className='counter'>
                            <img onClick={() => handleReplyCountChange('add', comment.id, reply.id)} src={plus} alt="positive-sign"></img>
                            <span>{reply.score}</span>
                            <img onClick={() => handleReplyCountChange('remove', comment.id, reply.id)} src={minus} alt="minus-sign"></img>
                        </div>
                        {reply.user.username === currentUser.username ? <EditDelete>
                            <div className='reply-action' onClick={() => handleDeleteClick()}  >
                                <img className='delete-edit' src={trashcan} alt={trashcan}>
                                </img>
                                <span style={{ color: 'hsl(358, 79%, 66%)', fontWeight: '500' }}>
                                    Delete
                                </span>
                            </div>
                            <div className='reply-action' onClick={() => setEditReply(!showEditReply)}>
                                <img className='delete-edit' src={pencil} alt={pencil}></img>
                                <span style={{ color: 'hsl(238, 40%, 52%)', fontWeight: '500' }}>
                                    Edit
                                </span>
                            </div>
                        </EditDelete>
                            : <div className='reply-box' onClick={() => setShowReply(!showAddReply)}>
                                <img className='reply' src={check} alt="reply-check"></img>
                                Reply
                            </div>}
                    </div>
                </ReplyBox>
                {showAddReply && <AddReply commentData={commentData} setCommentData={setCommentData} commentId={comment.id} setShowReply={setShowReply} />}
                {showEditReply && <EditReply commentData={commentData} setCommentData={setCommentData} setEditReply={setEditReply} replyId={reply.id} commentId={comment.id} />}
            </div>
        </>
    )
}