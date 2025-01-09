import { getMessaging, getToken } from 'firebase/messaging';

export function requestNotificationPermission() {
  const messaging = getMessaging();

  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' })
        .then((currentToken) => {
          if (currentToken) {
            console.log('FCM Token:', currentToken);
            // Send this token to your server to store it for later use
          } else {
            console.log('No registration token available.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}
