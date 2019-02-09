var _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return
  }
  const reducer = (max, blog) => {
    return max.likes > blog.likes ? max : blog
  }
  const favoriteBlog = blogs.reduce(reducer, 0)
  delete favoriteBlog.__v
  delete favoriteBlog._id
  delete favoriteBlog.url

  return favoriteBlog
}

const mostBlogs = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return
  }
  const blogsCount = _.countBy(blogs, 'author')
  const blogsCountAsArray = _.toPairs(blogsCount)
  const arrayBestPair = blogsCountAsArray.reduce((maxPair, pair) => maxPair[1] > pair[1] ? maxPair : pair, [])

  return { author: arrayBestPair[0], blogs: arrayBestPair[1] }
}

const mostLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return
  }
  const grouped = _.groupBy(blogs, 'author')
  var author = ''
  var mostLikes = 0
  _.forEach(grouped, (group) => {
    const likes = _.sumBy(group, 'likes')
    if (likes > mostLikes) {
      author = group[0].author
      mostLikes = likes
    }
  })
  return { author: author, likes: mostLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}