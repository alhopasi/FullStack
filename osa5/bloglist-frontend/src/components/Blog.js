import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
        <div>{blog.likes} likes <button onClick={() => addLike(blog)}>like</button></div>
        <div>added by {blog.user[0].name}</div>
      </div>
    )
  }
}
export default Blog