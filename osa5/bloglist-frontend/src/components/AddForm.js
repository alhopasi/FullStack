import React from 'react'

const AddForm = ({ addForm }) => (

    <form onSubmit={addForm.onSubmit} >
      <div>
        title:
    <input
          type="text"
          value={addForm.newTitle}
          name="title"
          onChange={addForm.onTitleChange}
        />
      </div>
      <div>
        author:
    <input
          type="text"
          value={addForm.newAuthor}
          name="author"
          onChange={addForm.onAuthorChange}
        />
      </div>
      <div>
        url:
    <input
          type="text"
          value={addForm.newUrl}
          name="url"
          onChange={addForm.onUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>

)

export default AddForm 