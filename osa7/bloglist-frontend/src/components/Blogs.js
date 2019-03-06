import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'

const BlogList = (props) => {

  const blogs = props.blogs

  const compare = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) return 1
    if (blog1.likes > blog2.likes) return -1
    return 0
  }
  blogs.sort(compare)

  return (
    <div>
      <h2>create new</h2>
      <Button><Link to={'/new'}>create</Link></Button>

      <h2>blogs app</h2>
      <Table striped celled>
        <Table.Body>
          {blogs.map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
              </Table.Cell>
              <Table.Cell>
                {blog.author}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogList)
export default ConnectedBlogList