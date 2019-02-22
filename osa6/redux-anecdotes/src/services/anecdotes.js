import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }

  const anecdote = asObject(content)
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (newAnecdote) => {
  const changedAnecdote = { ...newAnecdote, votes: newAnecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, changedAnecdote)
  return response.data
}

export default { getAll, createNew, vote }