// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-wDA47zDd_HlFcrErINORpTeqX0xyy7Y",
  authDomain: "fyp-19b08.firebaseapp.com",
  databaseURL: "https://fyp-19b08-default-rtdb.firebaseio.com",
  projectId: "fyp-19b08",
  storageBucket: "fyp-19b08.appspot.com",
  messagingSenderId: "118594307835",
  appId: "1:118594307835:web:cb49b0decfa86e6c3a525e",
};

firebase.initializeApp(firebaseConfig);

