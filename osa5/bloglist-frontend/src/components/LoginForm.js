import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  usernameFormInput,
  passwordFormInput
}) => {
  delete usernameFormInput.reset
  delete passwordFormInput.reset
  return (<div>
    <h2>Log in to application</h2>
    <form onSubmit={handleSubmit}>
      <div>
        username <input {...usernameFormInput} />
      </div>
      <div>
        password <input {...passwordFormInput} />
      </div>
      <button type="submit">log in</button>
    </form>
  </div>)
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  usernameFormInput: PropTypes.object.isRequired,
  passwordFormInput: PropTypes.object.isRequired,
}

export default LoginForm