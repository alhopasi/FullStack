import 'jest-dom/extend-expect'
import { render, cleanup, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')

afterEach(cleanup)

const user = {
  username: 'tezt',
  token: '1231231234',
  name: 'Test Dude'
}

window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

export default { render, waitForElement }