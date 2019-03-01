import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Anecdote = ({ anecdote }) => {
  return <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <Link to={anecdote.info}>{anecdote.info}</Link></p>
  </div>
}

const ConnectedAnecdote = connect()(Anecdote)
export default ConnectedAnecdote
