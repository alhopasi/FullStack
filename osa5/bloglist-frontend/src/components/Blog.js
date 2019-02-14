import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, removeHandler, user }) => {
  const [visible, setVisible] = useState(false)
  const [removeButtonVisible, setRemoveButtonVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: removeButtonVisible ? '' : 'none' }

  useEffect(() => {
    if (user.name === blog.user[0].name && user.username === blog.user[0].username) {
      setRemoveButtonVisible(true)
    }
  }, false)

  if (visible === false) {
    return (
      <div style={blogStyle}>
        <div onClick={() => setVisible(true)}>{blog.title} {blog.author}</div>
      </div>
    )
  }

  if (visible === true) {

    return (
      <div style={blogStyle}>
        <div onClick={() => setVisible(false)}>{blog.title} {blog.author}</div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes <button onClick={() => likeHandler(blog)}>like</button></div>
        <div>added by {blog.user[0].name}</div>
        <div style={showWhenVisible} className="togglableContent">
          <button onClick={() => removeHandler(blog)}>remove</button>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog