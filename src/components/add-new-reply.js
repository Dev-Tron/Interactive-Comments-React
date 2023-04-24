import { useState } from "react"
import { currentUser } from "../data"
import { NewComment } from "./add-new-comment"
import { ImageSend } from "./edit-comment"

export default function AddReply({ setCommentData, commentId, commentData, setShowReply }) {
    const [replyInput, setReplyInput] = useState('')

    const handleInputChange = (event) => {
        const { value } = event.target
        setReplyInput(value)
    }

    const handleAddReply = () => {
        const newComments = commentData.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, {
                        id: comment.replies.length + 1,
                        content: replyInput,
                        "createdAt": new Date().toLocaleString(),
                        score: 0,
                        replyingTo: comment.user.username,
                        user: {
                            "image": {
                                "png": require(`../assets/images/avatars/image-${currentUser.username}.png`),
                                "webp": `./images/avatars/image-${currentUser.username}.webp`
                            },
                            username: currentUser.username
                        }
                    }]
                }
            } else {
                return comment
            }
        });
        setCommentData(newComments)
        setShowReply(false)
    }

    return (
        <NewComment>
            <textarea value={replyInput} onChange={handleInputChange} className="target-area" name="Add-Comment" cols="30" rows="4" placeholder="Add a comment..." ></textarea>
            <ImageSend>
                <div>
                    <img className='user-img' src={currentUser.image.png} alt="user-avatar"></img>
                </div>
                <button onClick={handleAddReply}>
                    SEND
                </button>
            </ImageSend>
        </NewComment>
    )
} 
