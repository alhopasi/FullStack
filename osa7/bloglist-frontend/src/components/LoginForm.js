import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react'

const LoginForm = ({
  handleSubmit,
  usernameFormInput,
  passwordFormInput,
  setLoginVisible,
  loginVisible
}) => {
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  const usernameForm = { ...usernameFormInput }
  delete usernameForm.reset
  const passwordForm = { ...passwordFormInput }
  delete passwordForm.reset
  return (
    < div >
      <div style={hideWhenVisible}>
        <Button onClick={() => setLoginVisible(true)}>log in</Button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <h2>Log in to application</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Field>
                <label>
                  username: <input {...usernameForm} />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  password <input {...passwordForm} />
                </label>
              </Form.Field>
              <Button primary type="submit">log in</Button>
            </Form.Group>
            <Button onClick={() => setLoginVisible(false)}>cancel</Button>
          </Form>
        </div>

      </div>
    </div >
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  usernameFormInput: PropTypes.object.isRequired,
  passwordFormInput: PropTypes.object.isRequired,
}

export default LoginForm