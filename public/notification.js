const { Notification } = require('electron')

const showNotification = (showTitle, showBody) => {
  const notification = {
    title: showTitle,
    body: showBody
  }
  new Notification(notification).show();
}

module.exports = {showNotification};