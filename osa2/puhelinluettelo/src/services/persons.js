import React from 'react'

const Persons = ({ personsToShow, remover }) => {

    const Person = ({ person }) =>
      <p>
        {person.name} {person.number} <button onClick={() => remover(person)}>
          poista
    </button></p>
  
    return personsToShow.map(person =>
      <Person person={person}
        key={person.id} />
    )
  }

  export default Persons