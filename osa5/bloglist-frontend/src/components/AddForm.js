import React from 'react'

const AddForm = ({
  onSubmit,
  newTitle,
  onTitleChange,
  newAuthor,
  onAuthorChange,
  newUrl,
  onUrlChange
}) => (<form onSubmit={onSubmit} >
  <div>
    title:
    <input
      type="text"
      value={newTitle}
      name="title"
      onChange={onTitleChange}
    />
  </div>
  <div>
    author:
    <input
      type="text"
      value={newAuthor}
      name="author"
      onChange={onAuthorChange}
    />
  </div>
  <div>
    url:
    <input
      type="text"
      value={newUrl}
      name="url"
      onChange={onUrlChange}
    />
  </div>
  <button type="submit">create</button>
</form>)

export default AddForm