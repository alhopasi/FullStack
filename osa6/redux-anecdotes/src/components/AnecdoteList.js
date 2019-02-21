import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {

    const vote = (id) => {
      store.dispatch(
        voteAnecdote(id)
      )
    }

    const anecdotes = store.getState()
    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
      anecdotes.map(anecdote =>
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