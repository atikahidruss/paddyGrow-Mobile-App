import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import Plants from './components/Plants';
import React, { useEffect } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { requestNotificationPermission } from './services/notificationService';

function App() {
  useEffect(() => {
    // Request permission for push notifications
    requestNotificationPermission();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add the dynamic :id parameter to the dashboard route */}
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/plants" element={<Plants />} />
      </Routes>
    </Router>
  );
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, (err) => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

const messaging = getMessaging();

const requestForNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const token = await getToken(messaging, { vapidKey: 'BEUu5j4L51vZ_RHcg5UCewikbmN144_5sfGikigeBNvXm1ZrYduwH_7NFa4_FJyvoFlHfyJgYcAK000wIElzjEg' });
    console.log("Token:", token);
    // Send this token to your server or save it in your database
  }
};

requestForNotificationPermission();

export default App;
