import React from 'react';
import { newNotification } from '../reducers/notificationReducer'

const Notification = ({ store }) => {

  const notification = store.getState().notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification !== null) {
    setTimeout(() => {
      store.dispatch(newNotification(null))
    }, 5000)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return <div></div>
  }

  
}

export default Notification
