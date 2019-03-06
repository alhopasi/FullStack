/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      const user = action.data
      return state = user

    default: return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer