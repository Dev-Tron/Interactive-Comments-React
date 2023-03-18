import plus from '../assets/images/icon-plus.svg'
import minus from '../assets/images/icon-minus.svg'
import check from '../assets/images/icon-reply.svg'
import trashcan from '../assets/images/icon-delete.svg'
import pencil from '../assets/images/icon-edit.svg'
import { comments } from '../data'
import styled from 'styled-components'
import { useState } from 'react'

const Comment = styled.div`
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`

const Reply = styled(Comment)`
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
  margin-right: 5%;
  gap: 10px;
  cursor: pointer;
`

export default function Comments() {

        return (
          <div>
            {comments.map(( comment ) => (
                <div key={ comment.id }>
                  <Comment className='comment-box'>
                    <div className='user-info-box'>
                      <img className='user-img' src={comment.user.image.png} alt="user"></img>
                      <div className='intro'>
                        <h1 className='username'>{comment.user.username}</h1>
                        <span className='date'>{comment.createdAt}</span>
                      </div>
                    </div>
                    <p className='content'>{comment.content}</p>
                    <div className='counter-reply-buttons'>
                      <div className='counter'>
                        <img src={plus} alt="positive-sign"></img>
                        <span>{comment.score}</span>
                        <img src={minus} alt="minus-sign"></img>
                      </div>
                      <div className='reply-box'>
                        <img className='reply' src={check} alt="reply-check"></img>
                        Reply
                      </div>
                    </div>
                  </Comment>
                    {comment.replies.map((reply) => 
                    <Reply key={reply.id}>
                      <Vertline></Vertline>
                        <div className='user-info-box'>
                          <img className='user-img' src={reply.user.image.png} alt="user"></img>
                          <div className='intro'>
                            <h1 className='username'>{reply.user.username}</h1>
                            { reply.user.username === "juliusomo" && <You>you</You> }
                            <span className='date'>{reply.createdAt}</span>
                          </div>
                        </div>
                        <p className='content'><ReplyTo>@{reply.replyingTo}</ReplyTo>
                          {reply.content}
                        </p>
                        <div className='counter-reply-buttons'>
                          <div className='counter'>
                            <img src={plus} alt="positive-sign"></img>
                            <span>{reply.score}</span>
                            <img src={minus} alt="minus-sign"></img>
                          </div>
                          { reply.user.username === "juliusomo" ? <EditDelete><img className='delete-edit' src={trashcan} alt={trashcan}></img>Delete<img className='delete-edit' src={pencil} alt={pencil}></img>Edit
                          </EditDelete> : <div className='reply-box'><img className='reply' src={check} alt={check}></img>Reply</div> }
                        </div>
                    </Reply>)}
                </div>
            ))}
          </div> 
        )
    }

  