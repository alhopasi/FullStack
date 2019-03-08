import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  const notification = props.notification

  if (notification.data !== null) {
    setTimeout(() => {
      props.setNotification(null)
    }, notification.duration)
    return (
      <Message success>
        {notification.data}
      </Message>
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
