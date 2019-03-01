import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'


const CreateNewNoHistory = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    props.history.push('/')
    e.preventDefault()
    props.setNotification(`a new anecdote ${content} created!`, 10)
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const CreateNew = withRouter(CreateNewNoHistory)

const mapDispatchToProps = {
  setNotification
}

const connectedCreateNew = connect(null, mapDispatchToProps)(CreateNew)
export default connectedCreateNew