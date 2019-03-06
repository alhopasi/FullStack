import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Button, Menu } from 'semantic-ui-react'

const TopMenu = (props) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    props.setUser(null)
  }

  return (
    <div>
      <Menu inverted>
        <Menu.Item link>
          <Link to="/">blogs</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/users">users</Link>
        </Menu.Item>
        <Menu.Item>
          {props.user.name} logged in
        </Menu.Item>
        <Menu.Item link>
          <Button type="submit" onClick={handleLogout}><Link to='/'>logout</Link></Button>
        </Menu.Item>
      </Menu>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser,
}

const ConnectedTopMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopMenu)

export default ConnectedTopMenu