import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayHeader = props =>
  <div>
    <h1>{props.text}</h1>
  </div>

const Statistic = props =>
  <tr>
    <td>{props.text}</td>
    <td>{props.arvo} {props.text2}</td>
  </tr>

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>Ei yhtään palautetta annettu</p>
  }
  return <table>
    <tbody>
      <Statistic text='hyvä' arvo={good} />
      <Statistic text='neutraali' arvo={neutral} />
      <Statistic text='huono' arvo={bad} />
      <Statistic text='yhteensä' arvo={good + neutral + bad} />
      <Statistic text='keskiarvo' arvo={(good - bad) / (good + neutral + bad)} />
      <Statistic text='positiivisia' arvo={good / (good + neutral + bad)} text2='%' />
    </tbody>
  </table>
}

const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <DisplayHeader text='anna palautetta' />
      <Button handleClick={() => setGood(good + 1)} text='hyvä' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutraali' />
      <Button handleClick={() => setBad(bad + 1)} text='huono' />
      <DisplayHeader text='statistiikka' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)