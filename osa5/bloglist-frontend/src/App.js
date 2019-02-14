import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddForm from './components/AddForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [errorNotificationMsg, setErrorNotificationMsg] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotification('Wrong username or password', 'error', exception.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleAddNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const blog = await blogService.create(blogObject)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setBlogs(blogs.concat(blog))
      handleNotification(`a new blog ${blog.title} by ${blog.author} added`, 'info')
    } catch (exception) {
      handleNotification('error adding a new blog', 'error', exception.message)
    }
  }

  const handleAddLike = async (blog) => {
    const blogObject = {
      ...blog,
      user: blog.user[0].id,
      likes: blog.likes + 1
    }
    try {
      const returnedBlog = await blogService.update(blogObject)
      setBlogs(blogs.map(oldBlog => oldBlog.id !== blog.id ? oldBlog : returnedBlog))
      handleNotification(`liked ${blog.title} by ${blog.author}`, 'info')
    } catch (exception) {
      handleNotification('like rejected for unknown reason', 'error', exception.message)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog)
        handleNotification(`removed ${blog.title} by ${blog.author}`, 'info')
        setBlogs(blogs.filter(oldBlog => oldBlog.id !== blog.id))
      } catch (exception) {
        handleNotification('Remove failed: Only adder can remove blogs', 'error', exception.message)
      }
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addForm = () => (
    <AddForm
      onSubmit={handleAddNewBlog}
      newTitle={newTitle}
      onTitleChange={handleTitleChange}
      newAuthor={newAuthor}
      onAuthorChange={handleAuthorChange}
      newUrl={newUrl}
      onUrlChange={handleUrlChange}
    />
  )

  const blogForm = () => {
    const compare = (blog1, blog2) => {
      if (blog1.likes < blog2.likes) return 1
      if (blog1.likes > blog2.likes) return -1
      return 0
    }
    blogs.sort(compare)
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button type="submit" onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        {addForm()}

        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={handleAddLike}
            removeHandler={handleRemove}
            user={user} />
        )}
      </div>
    )
  }

  const Notification = ({ message, className }) => {
    if (message === null) {
      return null
    }

    return (
      <div className={className}>
        {message}
      </div>
    )
  }

  const handleNotification = (message, type, error) => {
    if (type === 'info') {
      setNotificationMsg(message)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 2500)
    }
    if (type === 'error') {
      setErrorNotificationMsg(message)
      setTimeout(() => {
        setErrorNotificationMsg(null)
      }, 2500)
      console.log(error)
    }
  }

  return (
    <div>
      <Notification message={notificationMsg} className='info' />
      <Notification message={errorNotificationMsg} className='error' />
      {user === null ? loginForm() : blogForm()}
    </div>
  )
}

export default App