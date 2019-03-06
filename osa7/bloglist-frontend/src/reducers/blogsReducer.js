/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const updatedBlog = action.data
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    case 'NEW_BLOG':
      const newBlog = action.data
      return [...state, newBlog]
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG':
      const blogToRemove = action.data
      const blogs = state
      return blogs.filter(oldBlog => oldBlog.id !== blogToRemove.id)

    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (blog) => {
  const updatedBlog = {
    ...blog,
    user: blog.user[0].id,
    likes: blog.likes + 1
  }
  return async dispatch => {
    const returnedBlog = await blogService.update(updatedBlog)
    dispatch({
      type: 'LIKE',
      data: returnedBlog
    })
  }
}

export const createNew = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export default blogsReducer