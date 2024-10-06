// NotificationPanel.js
import React from 'react';
import './NotificationPanel.css'; // Import the CSS file for styling

const notifications = [
  { name: 'Dhanuka', time: '10.32 am', message: 'Confirmation of BoM', unread: 4, img: '/path/to/1.jpg' },
  { name: 'Sahan', time: '09.17 am', message: 'Order Request', unread: 1, img: '/path/to/2.jpg' },
  { name: 'Shashi', time: 'Yesterday', message: 'Purchase Request', unread: 2, img: '/path/to/3.jpg' },
  { name: 'Pathum', time: 'Yesterday', message: 'What ...', unread: 0, img: '/path/to/4.jpg' },
  { name: 'Gaweshika', time: 'Yesterday', message: 'Payment completed', unread: 0, img: '/path/to/5.jpg' },
];

const NotificationPanel = ({ visible, onClose }) => {
  if (!visible) return null; // Do not render the panel if it's not visible

  return (
    <div className="notification-panel">
      <div className="panel-header">
        <h2>Inbox</h2>
        <button onClick={onClose} className="close-button">&#x2715;</button>
      </div>
      <ul className="notification-list">
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <img src={notification.img} alt={notification.name} className="notification-avatar" />
            <div className="notification-info">
              <div className="notification-header">
                <span className="notification-name">{notification.name}</span>
                <span className="notification-time">{notification.time}</span>
              </div>
              <div className="notification-message">{notification.message}</div>
              {notification.unread > 0 && (
                <span className="notification-unread">{notification.unread}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
