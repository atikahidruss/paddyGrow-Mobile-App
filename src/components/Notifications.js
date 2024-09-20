import React, { useEffect, useState } from 'react';
import { database, ref, onValue } from '../firebase';
import '../styles/Notifications.css';
import Header from '../components/Header.js';
import Navbar from '../components/Navbar.js';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notificationsRef = ref(database, 'notifications');
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNotifications(Object.values(data));
      }
    });
  }, []);

  return (
    <div className="notifications-page">
      <Header />
      <h1 class="notifications-header">Notifications</h1>
      <ul className="notifications-list">
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <p><strong>Date:</strong> {notification.date}</p>
            <p><strong>Message:</strong> {notification.message}</p>
          </li>
        ))}
      </ul>
      <Navbar />
    </div>
  );
}

export default Notifications;
