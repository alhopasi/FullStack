
const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_MESSAGE':
        return action.data
        
      default: return state
    }
  }

  export const newNotification = content => {
    return {
      type: 'SET_MESSAGE',
      data: content
    }
  }

  export default notificationReducer