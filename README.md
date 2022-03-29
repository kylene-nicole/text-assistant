# text-assistant

Since the pandemic, it has been my method of madness to text myself reminders, instead of adding them to my Google Calendar. I hate clicking through all of the options on any Calendar app when I am in a conversation or hurry. 

Today, I fixed that! Using Twilio SMS (Trial) I created a JavaScript application using Google Calendar API and Twilio API. Accepting texts as I normally compose them:

##### *Title*

##### *startTime*

##### *endTime (either another date, or a time-frame in minutes)*

##### *Description (if needed)*


My application parses this information, and inserts it into my google calendar. I receive a SMS text from Twilio apon success or failure.

Future additions:
I would like to implement the Google Event "if busy" functionality when inserting an event. It may be handy to make sure I am not overlapping with any events since I will not be looking at the Calendar interface.
Additionally, I would like to move away from ngrok, my temporary online server solution.

I will be posting a short blog post about this on my portfolio site soon!
