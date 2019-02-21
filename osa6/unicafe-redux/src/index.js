import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const DisplayHeader = ({ otsikko }) =>
    <div><h1>{otsikko}</h1></div>

  const Statistic = ({ text, arvo, text2 }) =>
    <div>{text} {arvo} {text2}
    </div>

  const yhteensa = store.getState().bad + store.getState().ok + store.getState().good
  const keskiarvo = (store.getState().good - store.getState().bad) / yhteensa
  const positiivisia = store.getState().good * 100 / yhteensa

  return (
    <div>
      <DisplayHeader otsikko='anna palautetta' />
      <button onClick={good}>hyvä</button>
      <button onClick={ok}>neutraali</button>
      <button onClick={bad}>huono</button>
      <button onClick={zero}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
      <DisplayHeader otsikko='statistiikka' />
      <Statistic text='hyvä' arvo={store.getState().good} />
      <Statistic text='neutraali' arvo={store.getState().ok} />
      <Statistic text='huono' arvo={store.getState().bad} />
      <Statistic text='yhteensä' arvo={yhteensa} />
      <Statistic text='keskiarvo' arvo={keskiarvo} />
      <Statistic text='positiivisia' arvo={positiivisia} text2={'%'} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
