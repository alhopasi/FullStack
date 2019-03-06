import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'


const BlogInfo = (props) => {


  if (props.blog === undefined) {
    return null
  }

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        props.removeBlog(blog)
        props.setNotification(`removed ${blog.title} by ${blog.author}`, 5)
      } catch (exception) {
        props.setNotification('Remove failed: Only adder can remove blogs', 5)
      }
    }
  }

  const handleLikeBlog = (blog) => {
    props.likeBlog(props.blog)
    props.setNotification(`liked ${blog.title} by ${blog.author}`, 5)
  }

  const showWhenVisible = { display: props.user.username === props.blog.user[0].username ? '' : 'none' }

  return (
    <div>
      <h2>{props.blog.title}</h2>
      <div><a href={props.blog.url}>{props.blog.url}</a></div>
      <div>{props.blog.likes} likes <Button onClick={() => handleLikeBlog(props.blog)}>like</Button></div>
      <div>added by {props.blog.user[0].name}</div>
      <div style={showWhenVisible} className="togglableContent">
        <Button onClick={() => handleRemoveBlog(props.blog)}>
          <Link to={'/'}>remove</Link></Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  likeBlog,
  removeBlog,
}

const ConnectedBlogInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogInfo)

export default ConnectedBlogInfo