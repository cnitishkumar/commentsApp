import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  addComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    console.log(name, comment)
    const newComment = {
      name,
      comment,
      id: uuidV4(),
      isLiked: false,
      date: new Date(),
      profileBackgroundColor: `${
        initialContainerBackgroundClassNames[
          Math.ceil(
            Math.random() * initialContainerBackgroundClassNames.length - 1,
          )
        ]
      }`,
    }
    if (name !== '' && comment !== '') {
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
      }))
    }
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onDelete = id => {
    const {commentsList} = this.state

    const filteredList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredList})
  }

  onClickingLike = id => {
    console.log('liked')

    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {
            ...eachComment,
            isLiked: !eachComment.isLiked,
          }
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {name, comment, commentsList} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="form-image-container">
          <div className="input-container">
            <form className="commentsForm" onSubmit={this.addComment} id="form">
              <p className="say-something">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                className="name"
                onChange={this.onChangeName}
              />
              <textarea
                rows="7"
                cols="50"
                value={comment}
                className="comment-input"
                onChange={this.onChangeComment}
                placeholder="Your Comment"
              />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="image"
              alt="comments"
            />
          </div>
        </div>
        <hr />
        <div className="comments-container">
          <p className="comments-count">
            <span className="count">{commentsList.length}</span> Comments
          </p>
          <ul className="ul-el">
            {commentsList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                key={eachComment.id}
                onLike={this.onClickingLike}
                onDelete={this.onDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
