import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>
const DisplayHeader = ({ text }) => <h1>{text}</h1>
const Display = ({ text }) => <p>{text}</p>
const DisplayVotes = (props) => <p> {props.text} {props.votes} {props.text2}</p>

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const random_number = Math.floor(Math.random() * (anecdotes.length - 1) + 1)
  const mostVotesIndex = points.indexOf(Math.max(...points))

  return (
    <div>
      <DisplayHeader text='Anecdote of the day' />
      <Display text={anecdotes[selected]} />
      <DisplayVotes text='has' votes={points[selected]} text2='votes' />
      <Button handleClick={() => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
      }} text='vote' />
      <Button
        handleClick={() => setSelected(random_number)}
        text='next anecdote' />
      <DisplayHeader text='Anecdote with most votes' />
      <Display text={anecdotes[mostVotesIndex]} />
      <DisplayVotes text='has' votes={points[mostVotesIndex]} text2='votes' />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)