import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';

// Your Firebase configuration
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
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

// Export the Firebase services and utility functions
export { firestore, storage, database, ref, onValue, set, remove };
