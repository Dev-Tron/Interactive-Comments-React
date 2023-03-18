import './App.css'
import AddComment from './components/add-new-comment'
import Attribution from './components/attribute'
import Comments from './components/comments'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
      body {
        height: 100%;
        width: 100%;
        padding-top: 2rem;
        background-color: hsl(228, 33%, 97%);
}`

function App() {

      return (
        <div className='app'>
          <GlobalStyle />
          <main>
            <Comments />
            <AddComment />
          </main>
          <footer>
            <Attribution />
          </footer>
        </div>
      )
}

export default App;
