const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Twilio = require("twilio");

// Twilio credentials (replace with your actual Account SID and Auth Token)
const accountSid = "AC3f0eaed41ebfb19ea822f43e61eae61e";
const authToken = "2c3f108dbcfdd7446918f976b3695dc2";
const client = new Twilio(accountSid, authToken);

// Initialize Firebase Admin SDK
admin.initializeApp();

// Your Twilio WhatsApp sandbox number
const twilioNumber = "whatsapp:+14155238886";

// Firebase Cloud Function that triggers on new notification in the database
exports.sendWhatsAppNotification = functions.database
    .ref("/notifications/{notificationId}")
    .onCreate((snapshot, context) => {
      const notification = snapshot.val();

      // Construct the message to send
      const messageBody = `New Notification:
      Date: ${notification.timestamp}
      Message: ${notification.message}`;


      // Send the message via Twilio
      return client.messages
          .create({
            body: messageBody,
            from: twilioNumber,
            to: "whatsapp:+601160778108",
          })
          .then((message) => {
            console.log("WhatsApp message sent:", message.sid);
          })
          .catch((error) => {
            console.error("Error sending WhatsApp message:", error);
          });
    });
