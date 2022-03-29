//calendar-api
const client_id = process.env.CALENDAR_ID;
const client_secret = process.env.CALENDAR_SECRET;
const client_refresh = process.env.CALENDAR_REFRESH;
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(client_id, client_secret);
oAuth2Client.setCredentials({
    refresh_token: client_refresh
});
const calendar = google.calendar({
    version: 'v3',
    auth: oAuth2Client
});
var title;
var start;
var end;
var description = "";

//twilio access
const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');
const { text } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express();
app.use(urlencoded({ extended: false }));

function parse(bodyInfo) {
    var lines = bodyInfo.split("\n");
    console.log(lines);

    if (lines[0]) {
        title = lines[0];
    }
    if (lines[1]) {
        start = new Date(lines[1]);
    }
    console.log(start);
    var num = parseInt(lines[2], 10);
    if (!isNaN(num)) {
        console.log(num);
        end = new Date(start.getTime() + num*60000); // milliseconds
    }
    else {
        // generic add 30 min
        end = new Date(start.getTime() + 30*60000);
    }
    console.log(end);
    if (lines[3]) {
        description = lines[3];
    }

    const event = {
        summary: title,
        description: description,
        start: {
            dateTime: start,
            timeZone: 'America/Los_Angeles'
        },
        end: {
            dateTime: end,
            timezone:'America/Los_Angeles'
        },
        colorId: 1
    };

    calendar.events.insert ({
            calendarId: 'primary',
            resource: event
        }, (err) => {
            if (err) {
                console.error('Calendar event creator error: ', err);
                return 1;
            }
            return 0;
        });
}

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    // console.log(res)
    // twiml.message('Success! Text in this format to add events to your calendar. \nTitle\nStart time\nEnd time\nDescription.')
    console.log(`Incoming from ${req.body.From}: ${req.body.Body}`);

    var ret = parse(req.body.Body);

    if (ret === 1) {
        twiml.message('Error. Try again?');
    }
    // console.log('Event Created! Go to Google Calendar to see event.');
    else {
        twiml.message('Event Created! Go to Google Calendar to see event.');
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});