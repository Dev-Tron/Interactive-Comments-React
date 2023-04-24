import './App.css'
import AddComment from './components/add-new-comment'
import Attribution from './components/attribute'
import Comments from './components/comments'
import { createGlobalStyle } from 'styled-components'
import { useState } from 'react'
import { comments } from './data'


const GlobalStyle = createGlobalStyle`
      body {
        height: 100%;
        width: 100%;
        padding-top: 2rem;
        background-color: hsl(228, 33%, 97%)
}`

function App() {
  /*  Adding a state to hold the comments data since
     since we need to be able to change it upon clicking
     the plus or minus signs. NOTE: We can't mutate the hard coded data.
  */
  const [commentData, setCommentData] = useState(comments)

  return (
    <div className='app'>
      <GlobalStyle />
      <main>
        <Comments commentData={commentData} setCommentData={setCommentData} />
        <AddComment commentData={commentData} setCommentData={setCommentData} />
      </main>
      <footer>
        <Attribution />
      </footer>
    </div>
  )
}

export default App;
