import React, { useEffect, useState } from 'react';
import { database, messaging, ref, onValue, remove } from '../firebase'; 
import '../styles/Notifications.css';
import Header from '../components/Header.js';
import Navbar from '../components/Navbar.js';
import { onMessage } from 'firebase/messaging';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notificationsRef = ref(database, 'notifications');

    // Listen to Firebase Realtime Database
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notificationArray = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setNotifications(notificationArray); // Only set notifications fetched from Firebase
      }
    });

    // Listen to FCM messages
    const unsubscribeMessaging = onMessage(messaging, (payload) => {
      console.log('Message received: ', payload);
      const newNotification = {
        key: payload.messageId || Date.now().toString(), // Use messageId if available
        timestamp: new Date().toLocaleString(),
        message: payload.notification.body,
      };
      setNotifications((prev) => {
        // Check if notification already exists to prevent duplication
        const exists = prev.find((notif) => notif.key === newNotification.key);
        return exists ? prev : [newNotification, ...prev];
      });

      // Display browser notification
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/firebase-logo.png',
      });
    });

    return () => {
      unsubscribe();
      unsubscribeMessaging(); // Cleanup listeners
    };
  }, []);

  const deleteNotification = (key) => {
    const notificationRef = ref(database, `notifications/${key}`);
    remove(notificationRef)
      .then(() => {
        console.log('Notification deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting notification:', error);
      });
  };

  return (
    <div className="notifications-page">
      <Header />
      <h1 className="notifications-header">Notifications</h1>

      {/* Telegram link at the top of the page */}
      <div className="telegram-link-container">
        <a 
          href="https://t.me/+Xj7JO4Qp9M85Nzg1"
          target="_blank" 
          rel="noopener noreferrer"
          className="telegram-link"
        >
          Click here to receive mobile notifications!
        </a>
      </div>

      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.key} className="notification-item">
            <p><strong>Date:</strong> {notification.timestamp}</p>
            <p><strong>Message:</strong> {notification.message}</p>
            <button onClick={() => deleteNotification(notification.key)} className="delete-button">
              Clear
            </button>
          </li>
        ))}
      </ul>
      <Navbar />
    </div>
  );
}

export default Notifications;
