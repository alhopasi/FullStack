import React from 'react'

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

  export default PersonForm