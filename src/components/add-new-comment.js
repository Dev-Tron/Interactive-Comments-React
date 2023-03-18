import { currentUser } from "../data"
import styled from 'styled-components'

const NewComment = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
`
const Message = styled.textarea`
    border-radius: 5px;
    padding: 5%;
    border: 1px solid hsl(223, 19%, 93%)
`
const ImageSend = styled.div`
    display: flex;
    margin-top: 5%;
    justify-content: space-between;
`

export default function AddComment() {
	return (
        <NewComment>
            <Message name="Add-Comment" cols="30" rows="4" placeholder="Add a comment..." ></Message>
            <ImageSend>
                <div>
                    <img className='user-img' src={currentUser.image.png} alt="user-avatar"></img>
                </div>
                <button>
                    SEND
                </button>
            </ImageSend>
        </NewComment>            
    )
} 
