// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, onValue, set, remove, update } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "<FIREBASE KEY>",
  authDomain: "fyp-19b08.firebaseapp.com",
  databaseURL: "https://fyp-19b08-default-rtdb.firebaseio.com",
  projectId: "fyp-19b08",
  storageBucket: "fyp-19b08.appspot.com",
  messagingSenderId: "118594307835",
  appId: "1:118594307835:web:cb49b0decfa86e6c3a525e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
const messaging = getMessaging(app);

export const requestForToken = () => {
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        navigator.serviceWorker
          .register("../firebase-messaging-sw.js") // Ensure this path is correct
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

// Listen for messages in foreground
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
});


// Export the Firebase services and utility functions
export const auth = getAuth(app);
export { firestore, storage, database, ref, onValue, set, remove, messaging, update};
export default app;
