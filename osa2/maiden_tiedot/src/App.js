import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FindField = ({ text, value, onChange }) => (
  <p>{text}
    <input
      value={value}
      onChange={onChange}
    /></p>
)

const ListCountries = ({ countriesToShow, handleClick }) => {

  const showCountries = countriesToShow.map(country =>
    <p key={country.name}>
      {country.name}
      <button
        onClick={handleClick}
        value={country.name}>
        show
      </button>
    </p>
  )

  const OneCountry = ({ name, capital, population, languages, flag }) => {

    const [weather, setWeather] = useState([])

    const capWeather = () => {
      console.log('effect')
      axios
        .get(`https://api.apixu.com/v1/current.json?key=bb7ac7097c6f4731ace124117192501&q=${capital}`)
        .then(response => {
          setWeather(response.data)
        })
    }

    useEffect(capWeather, [])

    const languageList = languages.map(language =>
      <li key={language.name}>{language.name}</li>
    )

    var weatherReturn = (
      <div></div>
    )
    console.log(weather)
    if (weather.current) {
      const temp = weather.current.temp_c
      const wind = weather.current.wind_kph
      const windDir = weather.current.wind_dir
      const icon = `https:${weather.current.condition.icon}`
      weatherReturn = (
        <div>
          <h1>Weather in {capital}</h1>
          <p><strong>temperature:</strong> {temp} Celsius</p>
          <img src={icon} alt="weather_icon" height={64} />
          <p><strong>wind:</strong> {wind} kph direction {windDir}</p>
        </div>
      )
    }

    return (
      <div>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>population {population}</p>
        <h2>languages</h2>
        <ul>{languageList}</ul>
        <img src={flag} alt={`${name} flag`} height={100} />
        {weatherReturn}
      </div>)
  }

  const showOneCountry = countriesToShow.map(country =>
    <OneCountry name={country.name}
      capital={country.capital}
      population={country.population}
      languages={country.languages}
      flag={country.flag}
      key={country.name}
    />
  )

  const checkCountriesSize = () => {
    if (countriesToShow.length === 1) {
      return showOneCountry
    }
    if (countriesToShow.length < 10) {
      return showCountries
    }
    else {
      return <p>Too many matches, specify another filter</p>
    }
  }

  return checkCountriesSize()
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [findField, setFindField] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFindChange = (event) => {
    setFindField(event.target.value)
  }

  const countryClick = (event) => {
    setFindField(event.target.value)
  }

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(findField.toLowerCase()))

  return (
    <div>
      <FindField
        text='find countries'
        value={findField}
        onChange={handleFindChange} />
      <ListCountries
        countriesToShow={countriesToShow}
        handleClick={countryClick} />
    </div>
  )
}

export default App;