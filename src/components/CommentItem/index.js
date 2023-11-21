import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, onLike, onDelete} = props
  const {
    name,
    comment,
    date,
    id,
    isLiked,
    profileBackgroundColor,
  } = commentDetails

  const deleteComment = () => {
    onDelete(id)
  }

  const onClickingLkeBtn = () => {
    onLike(id)
  }

  const likeIconUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeBtnText = isLiked ? 'Liked' : 'Like'

  return (
    <li className="list-item">
      <div className="comment-header">
        <p className={`profile-icon ${profileBackgroundColor}`}>{name[0]}</p>
        <p className="username">{name}</p>
        <p className="time-stamp">{formatDistanceToNow(date)}</p>
      </div>
      <p className="comment-content">{comment}</p>
      <div className="reaction-container">
        <button
          className="reaction-button"
          type="button"
          onClick={onClickingLkeBtn}
        >
          <img src={likeIconUrl} className="reaction-icon" alt="like" />
          {likeBtnText}
        </button>
        <button
          className="reaction-button"
          type="button"
          data-testid="delete"
          onClick={deleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="reaction-icon"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
