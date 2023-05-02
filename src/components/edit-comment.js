import { useState } from "react"
import { currentUser } from "../data"
import styled from 'styled-components'
import { SendButton } from "./add-new-comment"

export const EditBox = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 5%;
`
export const ImageSend = styled.div`
    display: flex;
    margin-top: 5%;
    justify-content: space-between;

    @media (min-width: 1440px) {
    margin-top: 1%;
  }

`

export default function EditComment({ commentData, setCommentData, commentId, setEditComment }) {
    const [input, setInput] = useState('')

    const handleInputChange = (event) => {
        const { value } = event.target
        setInput(value)
    }

    const handleEditComment = (commentId) => {

        const newComments = commentData.map((comment) => {
            if (commentId === comment.id) {
                return {
                    ...comment,
                    createdAt: new Date().toLocaleString,
                    content: input
                }
            } else {
                return comment
            }
        })

        setCommentData(newComments)
        setEditComment(false)
    }

    return (
        <EditBox>
            <textarea value={input} onChange={handleInputChange} className="target-area" name="Add-Comment" cols="30" rows="4" placeholder="Add a comment..." ></textarea>
            <ImageSend>
                <div>
                    <img className='user-img' src={currentUser.image.png} alt="user-avatar"></img>
                </div>
                <textarea value={input} onChange={handleInputChange} className="target-area2" name="Add-Comment" cols="58" rows="3" placeholder="Add a comment..." ></textarea>
                <SendButton onClick={() => handleEditComment(commentId)}>
                    UPDATE
                </SendButton>
            </ImageSend>
        </EditBox>
    )
} 
