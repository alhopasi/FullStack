import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const AddForm = (props) => {

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={props.onSubmit}>
        <Form.Field>
          <label>title</label>
          <input
            type="text"
            value={props.newTitle}
            name="title"
            onChange={props.onTitleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>author</label>
          <input
            type="text"
            value={props.newAuthor}
            name="author"
            onChange={props.onAuthorChange}
          />
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input
            type="text"
            value={props.newUrl}
            name="url"
            onChange={props.onUrlChange}
          />
        </Form.Field>
        <Button type="submit">create</Button>
      </Form>
    </div>
  )
}

export default AddForm