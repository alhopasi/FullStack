/* eslint-disable no-case-declarations */
/* eslint-disable indent */

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      const user = action.data
      return state = user

    default: return state
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export default userReducer