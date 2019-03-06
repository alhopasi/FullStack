import React from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import { Table } from 'semantic-ui-react'

const UserInfo = ({ user }) => {

  if (user === undefined) {
    return null
  }

  const BlogList = () => {
    return (
      <Table striped celled>
        <Table.Body>
          {user.blogs.map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell>{blog.title}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <BlogList />
    </div>
  )
}

const mapDispatchToProps = {
  initUsers,
}

const ConnectedUserInfo = connect(
  null,
  mapDispatchToProps,
)(UserInfo)

export default ConnectedUserInfo