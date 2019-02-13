import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddForm from './components/AddForm'
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
      handleNotification(`Wrong username or password`, 'error', exception.message)
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
      handleNotification(`error adding a new blog`, 'error', exception.message)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
        <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
        <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addForm = {
    onSubmit: handleAddNewBlog,
    newTitle: newTitle,
    onTitleChange: handleTitleChange,
    newAuthor: newAuthor,
    onAuthorChange: handleAuthorChange,
    newUrl: newUrl,
    onUrlChange: handleUrlChange
  }


  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <AddForm addForm={addForm} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

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