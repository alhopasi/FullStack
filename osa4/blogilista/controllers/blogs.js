const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const config = require('../utils/config')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.likes === undefined) {
    request.body['likes'] = 0
  }
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter