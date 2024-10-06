import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import NotificationPanel from './NotificationPanel';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ title, titlePrefix = 'My' }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming you store the token in localStorage

    // Clear the role from localStorage if stored
    localStorage.removeItem('role');

    // Clear the authentication token or other cookies by setting them to expire in the past
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear 'authToken' cookie
    document.cookie = 'role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear 'role' cookie

    navigate('/'); // Adjust this path if necessary
  };

  return (
    <div className='header-container'>
      <div className='title'>
        <span className='bold'>{titlePrefix}</span>{' '}
        <span className='highlight'>{title}</span>
      </div>
      <div className='search-bar'>
        <input type='text' placeholder='Search here' />
        <button className='search-button'>
          <i className='fa fa-search'></i> Search
        </button>
      </div>
      <div className='notifications'>
        <button className='notification-button' onClick={toggleNotifications}>
          <FaBell />
        </button>
        {showNotifications && (
          <NotificationPanel
            visible={showNotifications}
            onClose={closeNotifications}
          />
        )}
      </div>
      <button className='logout-btn' onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Header;
