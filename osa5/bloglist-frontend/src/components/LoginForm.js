import React from 'react'

const LoginForm = ({ loginForm }) => {
    console.log(loginForm)
    return (
<form onSubmit={loginForm.handleLogin}>
        <div>
          username
        <input
            type="text"
            value={loginForm.username}
            name="Username"
            onChange={loginForm.handleUsernameChange}
          />
        </div>
        <div>
          password
        <input
            type="password"
            value={loginForm.password}
            name="Password"
            onChange={loginForm.handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
)}

export default LoginForm