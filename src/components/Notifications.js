import React, { useEffect, useState } from 'react';
import { database, ref, onValue, remove } from '../firebase'; // Import remove
import '../styles/Notifications.css';
import Header from '../components/Header.js';
import Navbar from '../components/Navbar.js';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notificationsRef = ref(database, 'notifications');

    // Listen for changes in the 'notifications' section of the Realtime Database
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notificationArray = Object.entries(data).map(([key, value]) => ({
          key, // Store the key for deletion
          ...value
        }));
        setNotifications(notificationArray);

      }
    });
  }, []);

  // Function to delete a notification
  const deleteNotification = (key) => {
    const notificationRef = ref(database, `notifications/${key}`);
    remove(notificationRef)
      .then(() => {
        console.log("Notification deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting notification: ", error);
      });
  };

  return (
    <div className="notifications-page">
      <Header />
      <h1 className="notifications-header">Notifications</h1>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.key} className="notification-item">
            <p><strong>Date:</strong> {notification.timestamp}</p>
            <p><strong>Message:</strong> {notification.message}</p>
            <button onClick={() => deleteNotification(notification.key)} className="delete-button">Clear</button>
          </li>
        ))}
      </ul>
      <Navbar />
    </div>
  );
}

export default Notifications;
