import './App.css'
import data from "./data.json"
import { Component } from 'react'
import plus from './assets/images/icon-plus.svg'
import minus from './assets/images/icon-minus.svg'
import check from './assets/images/icon-reply.svg'


class App extends Component  {
  render() {
      return (
        <div className='app'>
                {
					data.comments.map(( comment, i ) => {
						return (
              <main>
                <div key={i}>
                  <div>
                    <img src={comment.user.image.png} alt="user"></img>
                    <h1>{comment.user.username}</h1>
                    <span>{comment.createdAt}</span>
                  </div>
                  <div>
                    <p>{comment.content}</p>
                  </div>
                  <div>
                    <div>
                      <div>
                          <img src={plus} alt="positive-sign"></img>
                      </div>
                      <span>{comment.score}</span>
                      <div>
                          <img src={minus} alt="minus-sign"></img>
                      </div>
                    </div>
                    <div>
                      <img src={check} alt="reply-check"></img>
                      Reply
                    </div>
                  </div>
                  {comment.replies.map(function (reply, i ) { 
                    return <div key={i}>
                      <div>
                        <img src={reply.user.image.png} alt="user"></img>
                        <h1>{reply.user.username}</h1>
                        <span>{reply.createdAt}</span>
                      </div>
                      <div>
                        <p>{reply.content}</p>
                      </div>
                      <div>
                        <div>
                          <div>
                              <img src={plus} alt="positive-sign"></img>
                          </div>
                          <span>{reply.score}</span>
                          <div>
                              <img src={minus} alt="minus-sign"></img>
                          </div>
                        </div>
                        <div>
                          <img src={check} alt="reply-check"></img>
                          Reply
                        </div>
                      </div>
                  </div>
            })} 
                </div>
              </main>
						)
					})
				}
              <footer>
                <div className="attribution">
                  Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. 
                  Coded by <a href="https://dev-tron.github.io/portfolio-website/">Keytron Brown</a>.
                </div>
              </footer>
        </div> 
      )
  }
}

export default App;
