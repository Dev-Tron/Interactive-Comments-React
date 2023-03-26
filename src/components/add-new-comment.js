import { currentUser } from "../data"
import styled from 'styled-components'

const NewComment = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 5%;
`
const ImageSend = styled.div`
    display: flex;
    margin-top: 5%;
    justify-content: space-between;
`

export default function AddComment() {
	return (
        <NewComment>
            <textarea className="target-area" name="Add-Comment" cols="30" rows="4" placeholder="Add a comment..." ></textarea>
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
