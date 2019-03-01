
const notificationReducer = (state = { data: null }, action) => {
  console.log('STATE:', state)
  switch (action.type) {
    case 'SET_MESSAGE':
      return action

    default: return state
  }
}

export const setNotification = (content, duration) => {
  console.log('setNotification; ', content, duration)
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: content,
      duration: duration * 1000
    })
  }
}

export default notificationReducer