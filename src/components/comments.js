import { useState } from "react"
import data from "../data.json"

export default function Comment() {
    const mainUser = useState(data.currentUser)
    const isMainUser = mainUser
    const [comments] = useState(data.comments)
    const [value] = useState(0)
    const {id, content, createdAt, score, user, replies} = comments[value]


    return (
        comments.map(() => (
            <div key={ id } className="comments">
                <div className="user-avatar-container">
                    <img className="avatar-img" src={user.image.png} alt="avatar"></img>
                    <h1 className="user-title">
                        {user.username}
                    </h1>
                    <span>
                        {createdAt}
                    </span>
                    <div className="hide-show">
                        <img src="" alt="reply-check"></img>
                        Reply
                    </div>
                </div>
                <p className="content">
                    {content}
                </p>
                <div className="button-share">
                    <div className="score-button">
                        <div>
                            <img src="" alt="plus-sign"></img>
                        </div>
                        <span>
                            {score}
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
                <div className="replies">
                    <div className="user-avatar-container">
                        <img className="avatar-img" src="" alt="avatar"></img>
                        <h1 className="user-title"></h1>
                        <span>
                            {replies.createdAt}
                        </span>
                        <div class="you">
                            <span>{ isMainUser ? "you" : "" }</span>
                        </div>
                        <div className="hide-show">
                            <img src="" alt="reply-check"></img>
                            Reply
                        </div>
                    </div>
                    <p className="content">
                        {replies.content}
                    </p>
                    <div className="button-share">
                        <div className="score-button">
                            <div>
                                <img src="" alt="plus-sign"></img>
                            </div>
                            <span>
                                {replies.score}
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
            </div>
        ))
    )   
}