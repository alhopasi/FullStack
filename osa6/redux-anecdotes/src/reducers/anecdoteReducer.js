import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdoteToVote = action.data
      const changedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      )
    case 'NEW_ANECDOTE':
      const anecdote = action.data
      return [...state, anecdote]
    case 'INIT_ANECDOTES':
      return action.data

    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const createNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer