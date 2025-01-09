// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated from 'react-dom'
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';  // PWA service worker

// Create the root for rendering the app
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root

// Render the app using the new root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

// Register the service worker for PWA
serviceWorkerRegistration.register();
