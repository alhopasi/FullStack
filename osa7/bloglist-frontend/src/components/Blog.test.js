import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'

afterEach(cleanup)

describe('SimpleBlog tests', () => {

  const simpleBlog = {
    author: 'Matti',
    title: 'How we became champions',
    url: 'http://www.championsblog.com',
    likes: '1'
  }

  test('renders content', () => {
    const mockHandler = jest.fn()
    const component = render(<SimpleBlog blog={simpleBlog} onClick={mockHandler} />)

    expect(component.container).toHaveTextContent('How we became champions Matti')
    expect(component.container).toHaveTextContent('blog has 1 likes')
  })

  test('button press works', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(<SimpleBlog blog={simpleBlog} onClick={mockHandler} />)

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})


describe('Real blog tests', () => {

  const blog = {
    author: 'Matti',
    title: 'A real bloggers dream',
    url: 'http://www.blogallday.com',
    likes: 52,
    user: [{
      username: 'tezt',
      name: 'Test Dude',
      id: '007'
    }]
  }
  const likeHandler = jest.fn
  const removeHandler = jest.fn
  const user = {
    username: 'tezt',
    name: 'Test Dude',
    id: '007'
  }

  let component

  beforeEach(() => {
    component = render(<Blog blog={blog}
      likeHandler={likeHandler}
      removeHandler={removeHandler}
      user={user}
      classname="testDiv" />)
  })

  test('renders real blog title and author', () => {
    expect(component.container).toHaveTextContent(
      'A real bloggers dream Matti')
  })

  test('do not render whole blog on load', () => {
    expect(component.container).not.toHaveTextContent(
      '52 likes')
  })

  test('renders real blog content after clicking', () => {
    const button = component.getByText('A real bloggers dream Matti')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      '52 likes')
    expect(component.container).toHaveTextContent(
      'added by Test Dude')
  })
})
