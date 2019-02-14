const blogs = [
  {
    user: [
      {
        username: 'root',
        name: 'root',
        id: '5c63e426b2693813dd7338d5'
      }
    ],
    title: 'Using login systems',
    author: 'root',
    url: 'thereIsNone',
    likes: 5,
    id: '5c63e4fab2693813dd7338d6'
  },
  {
    user: [
      {
        username: 'melkki',
        name: 'Matti Elkki',
        id: '5c5de7cbca047a53eb3cbbda'
      }
    ],
    title: 'toimiiko',
    author: 'melkki',
    url: 'ei',
    likes: 4,
    id: '5c63e514b2693813dd7338d7'
  },
  {
    user: [
      {
        username: 'melkki',
        name: 'Matti Elkki',
        id: '5c5de7cbca047a53eb3cbbda'
      }
    ],
    title: 'Frontin refactorii',
    author: 'melkki',
    url: 'vaikeeta',
    likes: 1,
    id: '5c6402d2b2693813dd7338d8'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  console.log('token set')
}

export default { getAll, setToken }