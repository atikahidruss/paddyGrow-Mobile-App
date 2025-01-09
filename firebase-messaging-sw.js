// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js")

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-wDA47zDd_HlFcrErINORpTeqX0xyy7Y",
  authDomain: "fyp-19b08.firebaseapp.com",
  databaseURL: "https://fyp-19b08-default-rtdb.firebaseio.com",
  projectId: "fyp-19b08",
  storageBucket: "fyp-19b08.appspot.com",
  messagingSenderId: "118594307835",
  appId: "1:118594307835:web:cb49b0decfa86e6c3a525e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js") // Path must match service worker location
          .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
            return getToken(messaging, {
              vapidKey: "BEUu5j4L51vZ_RHcg5UCewikbmN144_5sfGikigeBNvXm1ZrYduwH_7NFa4_FJyvoFlHfyJgYcAK000wIElzjEg",
              serviceWorkerRegistration: registration,
            });
          })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              // Here, you might also send this token to your server to save it for future notifications
            } else {
              console.log("No registration token available.");
            }
          })
          .catch((err) => {
            console.error("An error occurred while retrieving token.", err);
          });
      } else {
        console.log("Notification permission not granted.");
      }
    })
    .catch((error) => {
      console.error("Error requesting notification permission:", error);
    });
};

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
});
