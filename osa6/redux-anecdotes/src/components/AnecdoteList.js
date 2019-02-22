import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const vote = (id) => {
    const votedAnecdote = props.anecdotesToShow().find(a => a.id === id)
    props.voteAnecdote(votedAnecdote)
    props.setNotification(`you voted '${votedAnecdote.content}'`, 10)
  }
  
  return (
    props.anecdotesToShow().map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

const mapStateToProps = (state) => {
   const anecdotesToShow = () => {
    const anecdotes = state.anecdotes
    anecdotes.sort((a, b) => b.votes - a.votes)
    return anecdotes.filter(
      a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  }

  return {
    anecdotesToShow: anecdotesToShow,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes