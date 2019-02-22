import React from 'react';
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = ( props ) => {

  const notification = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.data !== null) {
    setTimeout(() => {
      props.setNotification(null)
    }, notification.duration)
    return (
      <div style={style}>
        {notification.data}
      </div>
    )
  } else {
    return <div></div>
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  setNotification
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Notification)
export default ConnectedNotification
