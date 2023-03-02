import { useState } from "react"
import data from "../data.json"

export default function Comment() {
    const mainUser = useState(data.currentUser)
    const [comments] = useState(data.comments)
    const [value, setValue] = useState(0)
    const {id, content, createdAt, score, user, image, username, replies} = comments[value]

    return (
        <div className="comments">
            <div className="user-avatar-container">
                <img className="avatar-img" src="" alt="avatar-image"></img>
                <h1 className="user-title"></h1>  
                <span></span>
                <div className="hide-show">
                    <img src="" alt="reply-check"></img>
                    Reply
                </div>
            </div>
            <p className="content">
            
            </p>
            <div className="button-share">
            <div className="score-button">
                <div>
                    <img src="" alt="plus-sign"></img>
                </div>
                <span>
    
                </span>
                <div>
                    <img src="" alt="minus-sign"></img>
                </div>
            </div>
                <div>
                    <img src="" alt="reply-check"></img>
                    Reply
                </div>
            </div>
        </div>
    )   
}