import 'jest-dom/extend-expect'
import { render, cleanup, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')

afterEach(cleanup)

window.localStorage = ''

export default { render, waitForElement }