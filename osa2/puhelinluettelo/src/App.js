import React, { useState, useEffect } from 'react'
import yllapito from './services/yllapito'
import './index.css'

const Filter = ({ text, value, onChange }) => (
  <p>{text}
    <input
      value={value}
      onChange={onChange}
    /></p>
)

const PersonForm = ({ form }) => (
  <form onSubmit={form.onSubmit}>
    <div>
      nimi: <input
        value={form.nameValue}
        onChange={form.nameOnChange}
      />
    </div>
    <div>
      numero: <input
        value={form.numberValue}
        onChange={form.numberOnChange}
      />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [errorNotificationMsg, setErrorNotificationMsg] = useState(null)

  useEffect(() => {
    yllapito
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log(error)
        alert('virhe haettaessa tietoja')
      })
  }, [])

  const Person = ({ person }) =>
    <p>
      {person.name} {person.number} <button onClick={() => handleRemovePerson(person)}>
        poista
  </button></p>

  const Notification = ({ message, className }) => {
    if (message === null) {
      return null
    }

    return (
      <div className={className}>
        {message}
      </div>
    )
  }

  const handleRemovePerson = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}`)) {
      yllapito
        .remove(person)
        .then(promise => {
          refreshList()
          setNotificationMsg(`Poistettiin ${person.name}`)
          setTimeout(() => {
            setNotificationMsg(null)
          }, 3000)
        })
        .catch(error => {
          setErrorNotificationMsg(`Henkilö ${person.name} on jo poistettu`)
          setTimeout(() => {
            setErrorNotificationMsg(null)
          }, 3000)
          console.log(error)
          refreshList()
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    var nameIsNotListed = true

    const newPerson = {
      name: newName,
      number: newNumber,

      id: persons[persons.length - 1].id + 1,
    }
    persons.forEach(person => {
      if (person.name === newPerson.name) {
        if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
          const changedPerson = { ...person, number: newPerson.number }
          yllapito
            .update(changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== changedPerson.name ? person : returnedPerson))
              setNotificationMsg(`Muutettiin henkilön ${person.name} puhelinnumeroa`)
              setTimeout(() => {
                setNotificationMsg(null)
              }, 3000)
            })
            .catch(error => {
              setErrorNotificationMsg(`Henkilöä ${person.name} ei löydy`)
              setTimeout(() => {
                setErrorNotificationMsg(null)
              }, 3000)
              console.log(error)
              refreshList()
            })


        }
        nameIsNotListed = false
      }
    })
    if (nameIsNotListed) {
      yllapito
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          setNotificationMsg(`Lisättiin ${person.name}`)
          setTimeout(() => {
            setNotificationMsg(null)
          }, 3000)
        })
        .catch(error => {
          setErrorNotificationMsg(`Henkilön ${newPerson.name} lisäys epäonnistui`)
          setTimeout(() => {
            setErrorNotificationMsg(null)
          }, 3000)
          console.log(error)
          refreshList()
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const refreshList = () => {
    yllapito
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  const form = {
    onSubmit: addPerson,
    nameValue: newName,
    nameOnChange: handleNameChange,
    numberValue: newNumber,
    numberOnChange: handleNumberChange
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={notificationMsg} className='info' />
      <Notification message={errorNotificationMsg} className='error' />
      <Filter text='rajaa näytettäviä'
        value={newFilter}
        onChange={handleFilterChange}
      />
      <h2>lisää uusi</h2>
      <PersonForm form={form} />
      <h2>Numerot</h2>
      {personsToShow.map(person =>
        <Person person={person}
          key={person.id} />
      )}
    </div>
  )

}

export default App