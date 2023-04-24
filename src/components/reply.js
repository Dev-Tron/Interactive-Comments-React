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

export const CommentBox = styled.div`
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`

const ReplyBox = styled(CommentBox)`
  width: 94%;
  margin-left: 5%;
`

const Vertline = styled.div`
  border-left: 1px solid hsl(239, 57%, 85%);
  height: 550px;
  position: absolute;
  left: 5%;
  margin-left: -3px;
  top: 584px;
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
  gap: 10px;
`

export default function Reply({ commentData, setCommentData, comment, reply }) {
    const [showEditReply, setEditReply] = useState(false)
    const [showAddReply, setShowReply] = useState(false)

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
        setCommentData(newComments);
    }

    return (
        <>
            <ReplyBox key={reply.id}>
                <Vertline></Vertline>
                <div className='user-info-box'>
                    <img className='user-img' src={reply.user.image.png} alt="user"></img>
                    <div className='intro'>
                        <h1 className='username'>{reply.user.username}</h1>
                        {reply.user.username === "juliusomo" && <You>you</You>}
                        <span className='date'>{reply.createdAt}</span>
                    </div>
                </div>
                <p className='content'><ReplyTo>@{reply.replyingTo}</ReplyTo>
                    {reply.content}
                </p>
                <div className='counter-reply-buttons'>
                    <div className='counter'>
                        <img onClick={() => handleReplyCountChange('add', comment.id, reply.id)} src={plus} alt="positive-sign"></img>
                        <span>{reply.score}</span>
                        <img onClick={() => handleReplyCountChange('remove', comment.id, reply.id)} src={minus} alt="minus-sign"></img>
                    </div>
                    {reply.user.username === currentUser.username ? <EditDelete>
                        <div className='reply-action' onClick={() => handleDeleteReply(comment.id, reply.id)}  >
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
        </>
    )
}