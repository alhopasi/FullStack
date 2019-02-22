import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {

    const { anecdotes, filter }= store.getState()

    const vote = (id) => {
        const votedAnecdote = anecdotes.find(a => a.id === id)
      store.dispatch(
        voteAnecdote(id),
      )
      store.dispatch(
        newNotification(`you voted '${votedAnecdote.content}'`)
      )
    }

    const anecdotesToShow = () => {
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }

    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
      anecdotesToShow().map(anecdote =>
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

  export default AnecdoteList