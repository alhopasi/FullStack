import React from 'react'

const Filter = ({ text, value, onChange }) => (
    <p>{text}
      <input
        value={value}
        onChange={onChange}
      /></p>
  )

export default Filter