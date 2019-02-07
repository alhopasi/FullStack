const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

beforeEach(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
})

describe('api GET functions', async () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('has id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })
})

describe('api POST functions', async () => {
  test('a blog can be added', async () => {
    const newBlog = {
      title: 'Upeeta täälläkin',
      author: 'Martti',
      url: 'none',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(response => response.title)
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain('Upeeta täälläkin')
  })
  test('if likes is undefined create likes: 0', async () => {
    const newBlog = {
      title: 'Upeeta täälläkin',
      author: 'Martti',
      url: 'none',
    }
    if (newBlog.likes === undefined) {
      newBlog['likes'] = 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await api.get('/api/blogs')
    expect(response.body[6].likes).toBe(0)
  })
  test('if title or url are undefined return statuscode 400', async () => {
    const newBlog = {
      author: 'Martti',
      url: 'none',
      likes: 3
    }
    const newBlog2 = {
      author: 'Martti',
      title: 'upeeta',
      likes: 3
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })
})

describe('deletion and put of a blog', async () => {
  test('delete first blog', async () => {
    const blogs = await api.get('/api/blogs')
    const blogToDelete = blogs.body[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body.length).toBe(blogs.body.length - 1)
    const titles = blogsAtEnd.body.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('put first blog', async () => {
    const blogs = await api.get('/api/blogs')
    const oldBlog = blogs.body[0]
    const blogToPut = {
      ...oldBlog,
      likes: oldBlog.likes + 1
    }
    await api
      .put(`/api/blogs/${blogToPut.id}`)
      .send(blogToPut)
      .expect(200)
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body[0].title).toBe(oldBlog.title)
    expect(blogsAtEnd.body[0].likes).toBe(oldBlog.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
