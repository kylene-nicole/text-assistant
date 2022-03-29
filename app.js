require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myMobile = process.env.MY_PHONE_NUMBER;
const twilioNum = process.env.TWILIO_NUMBER;
var client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Text-Assistant for Google Calendar.',
     from: twilioNum,
     to: myMobile
   })
  .then(message => console.log(message.sid, message))
  .catch(err => console.log(err));