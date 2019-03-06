/* eslint-disable indent */

const notificationReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action

    default: return state
  }
}

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: content,
      duration: duration * 1000
    })
  }
}

export default notificationReducer