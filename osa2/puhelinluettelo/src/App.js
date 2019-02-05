import React, { useState, useEffect } from 'react'
import yllapito from './services/yllapito'
import './index.css'
import Persons from './services/persons'
import PersonForm from './services/personForm'
import Filter from './services/filter'

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
          handleNotification(`Poistettiin ${person.name}`, 'info')
        })
        .catch(error => {
          handleNotification(`Henkilö ${person.name} on jo poistettu`, 'error', error)
        })
        removePersonFromList(person.name)
    }
  }

  const handleNotification = (message, type, error) => {
    if (type === 'info') {
      setNotificationMsg(message)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 3000)
    }
    if (type === 'error') {
      setErrorNotificationMsg(message)
      setTimeout(() => {
        setErrorNotificationMsg(null)
      }, 3000)
      console.log(error)
    }
  }

  const update = (changedPerson) => {
    yllapito
      .update(changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.name !== changedPerson.name ? person : returnedPerson))
        handleNotification(`Muutettiin henkilön ${newName} puhelinnumeroa`, 'info')
      })
      .catch(error => {
        handleNotification(`Henkilöä ${newName} ei löydy`, 'error', error)
        removePersonFromList(newName)
      })
  }

  const createNew = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    }
    yllapito
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        handleNotification(`Lisättiin ${person.name}`, 'info')
      })
      .catch(error => {
        if (newPerson.name.length < 3 || newPerson.number.length < 8) {
          handleNotification(`Nimen tulee olla vähintään 3 kirjainta ja puhelinnumeron 8 numeroa pitkä`, 'error', error)
        } else {
          handleNotification(`Henkilön ${newPerson.name} lisäys epäonnistui`, 'error', error)
        }
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const oldPerson = persons.filter(person => person.name === newName)
    if (oldPerson.length === 1) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const changedPerson = { ...oldPerson[0], number: newNumber }
        update(changedPerson)
      }
    } else {
      createNew()
    }
    setNewName('')
    setNewNumber('')
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

  const removePersonFromList = (name) => {
    setPersons(persons.filter(person => person.name !== name))
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
      <Persons personsToShow={personsToShow} remover={handleRemovePerson} />
    </div>
  )
}

export default App