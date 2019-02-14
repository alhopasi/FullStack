import React from 'react'
import App from './App'
import Jest from './setupTests'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = Jest.render(
      <App />
    )
    component.rerender(<App />)

    await Jest.waitForElement(
      () => component.getByText('log in')
    )

    // expectations here
    expect(component.container).not.toHaveTextContent('logged in')
    expect(component.container).toHaveTextContent('log in')
  })


  test('if user logged, blogs are rendered', async () => {
    const user = {
      username: 'tezt',
      token: '1231231234',
      name: 'Test Dude'
    }

    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    const component = Jest.render(
      <App />
    )
    await component.rerender(<App />)

    expect(component.container).toHaveTextContent('logged in')
    expect(component.container).toHaveTextContent('toimiiko')
    expect(component.container).toHaveTextContent('Frontin refactorii melkki')

  })

})