import React from 'react';
import { newNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = ( props ) => {

  const notification = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification !== null) {
    setTimeout(() => {
      props.newNotification(null)
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  newNotification
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Notification)

export default ConnectedNotification
