import React from 'react'

const Header = ({ header }) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0);

  return (
    <>
      {parts.map(content =>
        <Part
          name={content.name}
          exercises={content.exercises}
          key={content.id}
        />
      )}
      Yhteensä {total} tehtävää
      </>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

export default Course