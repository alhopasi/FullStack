import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import { useField } from './hooks'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createNew } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import Notification from './components/Notification'
import AddForm from './components/AddForm'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import UsersInfo from './components/UsersInfo'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import TopMenu from './components/Menu'
import {
  BrowserRouter as Router,
  Route, withRouter,
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'

const App = (props) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const usernameForm = useField('text')
  const passwordForm = useField('password')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
    props.initUsers()
    props.initializeBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = usernameForm.value
    const password = passwordForm.value
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.setUser(user)
      usernameForm.reset()
      passwordForm.reset()

    } catch (exception) {
      props.setNotification('Wrong username or password', 5)
      console.log('EXCEPTION:', exception.message)
    }
  }

  const handleAddNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try {
      await props.createNew(blogObject)
      await props.initUsers()
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      props.setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5)
    } catch (exception) {
      props.setNotification('error adding a new blog', 5)
    }
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

  const userById = (id) => {
    return props.users.find(user => user.id === id)
  }

  const blogById = (id) => {
    return props.blogs.find(blog => blog.id === id)
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

  if (props.user === null) {
    return (
      <Container>
        <div>
          <Notification />
          <LoginForm
            handleSubmit={handleLogin}
            usernameFormInput={usernameForm}
            passwordFormInput={passwordForm}
            setLoginVisible={setLoginVisible}
            loginVisible={loginVisible}
          />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div>
        <Router>
          <div>
            <TopMenu />
            <Notification />

            <Route exact path="/" render={() => <Blogs />} />
            <Route exact path="/users" render={() => <UsersInfo />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <UserInfo user={userById(match.params.id)} />
            } />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <BlogInfo blog={blogById(match.params.id)} />
            } />
            <Route exact path="/new" render={() => <AddForm
              onSubmit={handleAddNewBlog}
              newTitle={newTitle}
              onTitleChange={handleTitleChange}
              newAuthor={newAuthor}
              onAuthorChange={handleAuthorChange}
              newUrl={newUrl}
              onUrlChange={handleUrlChange}
            />} />
          </div>
        </Router>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createNew,
  setUser,
  initUsers,
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default connectedApp