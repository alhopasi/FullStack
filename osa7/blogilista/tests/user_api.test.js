const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const api = supertest(app)

describe('when there is initially one user at db', async () => {
  beforeEach(async () => {
    await User.remove({})
    const user = { username: 'root', name: 'root', password: 'sekret' }
    await api
      .post('/api/users')
      .send(user)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body.length).toBe(usersAtStart.body.length + 1)

    const usernames = usersAtEnd.body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await api.get('/api/users')

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body.length).toBe(usersAtStart.body.length)
  })
  test('creation fails with proper statuscode and message if username too short', async () => {
    const usersAtStart = await api.get('/api/users')

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain(`\`username\` (\`${newUser.username}\`) is shorter`)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body.length).toBe(usersAtStart.body.length)
  })
})

describe('when there are many usernames initially at db', async () => {
  const initialUsers = [
    {
      username: 'root',
      name: 'root',
      password: 'sekret',
    },
    {
      username: 'paziz',
      name: 'Pasi',
      password: 'onKiva',
    },
    {
      username: 'masa',
      name: 'Matti',
      password: 'Luuk',
    },
    {
      username: 'Arto',
      name: 'artsi',
      password: 'helpperi',
    },
    {
      username: 'aesk',
      name: 'Arto Eskola',
      password: 'pwnage',
    },
  ]

  beforeEach(async () => {
    await User.remove({})

    const userObjects = initialUsers
      .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())

    await Promise.all(promiseArray)
  })
})

afterAll(() => {
  mongoose.connection.close()
})