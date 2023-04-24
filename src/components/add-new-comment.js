import { useState } from "react"
import { currentUser } from "../data"
import styled from 'styled-components'
import { ImageSend } from "./edit-comment"

export const NewComment = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 5%;
`

export default function AddComment({ commentData, setCommentData }) {
    const [commentInput, setCommentInput] = useState('')

    const handleInputChange = (event) => {
        const { value } = event.target;
        setCommentInput(value)
    }

    const handleAddComment = () => {
        const id = commentData.length + 1
        const comment = {
            id,
            content: commentInput,
            createdAt: new Date().toLocaleString(),
            score: 0,
            user: {
                image: {
                    png: require(`../assets/images/avatars/image-${currentUser.username}.png`),
                    webp: "./images/avatars/image-juliusomo.webp"
                },
                username: currentUser.username
            },
            replies: []
        }
        const newComments = [...commentData, comment]
        setCommentData(newComments)
        setCommentInput('')
    }

    return (
        <NewComment>
            <textarea value={commentInput} onChange={handleInputChange} className="target-area" name="Add-Comment" cols="30" rows="4" placeholder="Add a comment..." ></textarea>
            <ImageSend>
                <div>
                    <img className='user-img' src={currentUser.image.png} alt="user-avatar"></img>
                </div>
                <button onClick={handleAddComment}>
                    SEND
                </button>
            </ImageSend>
        </NewComment>
    )
} 
