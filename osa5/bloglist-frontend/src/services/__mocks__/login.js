
const user = {
  username: 'tezt',
  token: '1231231234',
  name: 'Test Dude'
}
const login = () => {
  return Promise.resolve(user)
}

export default { login }