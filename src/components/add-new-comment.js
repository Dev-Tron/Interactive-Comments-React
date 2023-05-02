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

export const SendButton = styled.button`
    cursor: pointer;
    background-color: hsl(238, 40%, 52%);
    color: hsl(228, 33%, 97%);
    border: none;
    padding: .50rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;

    &:hover {
        opacity: 0.5;
    }

    @media (min-width: 1440px) {
    height: 50px;
    }
`

const ImageSend2 = styled(ImageSend)`
    @media (min-width: 1440px) {
    margin-top: 1%;
    justify-content: center;
    gap: 2%;
  }
`

export default function AddComment({ commentData, setCommentData }) {
    const [commentInput, setCommentInput] = useState("")

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
            <ImageSend2>
                <div>
                    <img className='user-img' src={currentUser.image.png} alt="user-avatar"></img>
                </div>
                <textarea value={commentInput} onChange={handleInputChange} className="target-area2" name="Add-Comment" cols="60" rows="3" placeholder="Add a comment..." ></textarea>
                <SendButton onClick={handleAddComment}>
                    SEND
                </SendButton>
            </ImageSend2>
        </NewComment>
    )
} 
