import Comment from './comment'

export default function Comments({ commentData, setCommentData }) {
  return (
    <div>
      {commentData.map((comment) => (
        <Comment key={`comment-${comment.id}`} comment={comment} commentData={commentData} setCommentData={setCommentData} />
      ))}
    </div>
  )
}

