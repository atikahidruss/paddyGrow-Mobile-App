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

// Register the service worker for PWA
serviceWorkerRegistration.register();

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