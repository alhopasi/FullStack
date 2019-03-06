import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'

const Menu = ({ anecdotes, addNew }) => {
  
  const anecdoteById = (id) => {
    return anecdotes.find(a => a.id === id)
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to='/'>anecdotes</Link>
          <Link style={padding} to='/create'>create new</Link>
          <Link style={padding} to='/about'>about</Link>
        </div>
        <Notification />
        <Route exact path='/' render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route exact path='/create' render={() => <CreateNew addNew={addNew} />} />
        <Route exact path='/about' render={() => <About />} />
        <Route exact path='/anecdotes/:id' render={({ match }) =>
          <Anecdote anecdote={anecdoteById(match.params.id)} />
        } />
      </div>
    </Router>
  )
}

const App = (props) => {
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} />
      <Footer />
    </div>
  )
}

const mapDispatchToProps = {
  setNotification
}

const connectedApp = connect(null, mapDispatchToProps )(App)
export default connectedApp