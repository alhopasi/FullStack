import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {
    const createAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      store.dispatch(
        newAnecdote(content)
      )
      event.target.anecdote.value = ''
    }
    return (
      <><h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
      </>
    )
  }

  export default AnecdoteForm