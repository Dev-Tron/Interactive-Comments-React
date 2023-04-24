import { useState } from "react"
import { currentUser } from "../data"
import { EditBox } from "./edit-comment"
import { ImageSend } from "./edit-comment"

export default function EditReply({ commentData, setCommentData, commentId, setEditReply, replyId }) {
    const [input, setInput] = useState('')

    const handleInputChange = (event) => {
        const { value } = event.target;
        setInput(value)
    }

    const handleEditReply = (commentId, replyId) => {

        const newComments = commentData.map((comment) => {
            if (commentId === comment.id) {
                const newReplies = comment.replies.map((reply) => {
                    if (reply.id === replyId) {
                        return {
                            ...reply,
                            createdAt: new Date().toLocaleString(),
                            content: input
                        }
                    }
                    else {
                        return reply
                    }
                })
                return {
                    ...comment,
                    replies: newReplies
                }
            } else {
                return comment
            }
        })

        setCommentData(newComments)
        setEditReply(false)
    }

    return (
        <EditBox>
            <textarea value={input} onChange={handleInputChange} className="target-area" name="Add-Comment" cols="30" rows="4" placeholder="Edit reply..." ></textarea>
            <ImageSend>
                <div>
                    <img className='user-img' src={currentUser.image.png} alt="user-avatar"></img>
                </div>
                <button onClick={() => handleEditReply(commentId, replyId)}>
                    UPDATE
                </button>
            </ImageSend>
        </EditBox>
    )
} 
