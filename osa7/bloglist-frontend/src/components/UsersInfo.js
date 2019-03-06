import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const UsersInfo = (props) => {

  const tableData = () => {
    const usersToTable = props.users.map(user => ({ userName: user.name, blogsAmount: user.blogs.length, id: user.id }))
    return usersToTable
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell></Table.Cell><Table.Cell>blogs created</Table.Cell>
          </Table.Row>
          {tableData().map(row =>
            <Table.Row key={row.userName}>
              <Table.Cell><Link to={`/users/${row.id}`}>{row.userName}</Link></Table.Cell>
              <Table.Cell>{row.blogsAmount}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

const ConnectedUsersInfo = connect(
  mapStateToProps,
  null,
)(UsersInfo)

export default ConnectedUsersInfo