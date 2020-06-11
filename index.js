// Require google from googleapis package.
const { google } = require('googleapis')

const {OAuth2} = google.auth

const OAuth2Client = new OAuth2('837318775268-us7muqfc7726se44c3bclc06dtc4vul5.apps.googleusercontent.com',
'XIRW3dhkt7ILc-72UG7jWOGh')

OAuth2Client.setCredentials({refresh_token: 
    '1//04oOsiGnJGzKACgYIARAAGAQSNwF-L9Ir6l9VlGSzfiJQvutsgA1bNJ9MefVPKRUSLZ2wsk9I5F8QIFMGV4PzjxnomPcydm9bvWQ'});

const calendar = google.calendar({version: 'v3',auth: OAuth2Client})

const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
    summary: 'Meeting with Shriya',
    location: '6 Iris Street',
    description: 'To arrange wedding plans and how to get along',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/Denver'
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/Denver'
    },
    colorId: 1,
}

calendar.freebusy.query({
    resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'America/Denver',
        items: [{id: 'primary'}],

    }
},(err,res) => {
    if(err){
        return console.error('Free Busy Query Error',err)
    }

    const eventsArr = res.data.calendars.primary.busy

    if(eventsArr.length === 0){
        return calendar.events.insert({
            calendarId: 'primary',resource: event
        }, err => {
            if(err) return console.error('Calender event creation error: ',err)

            return console.log('Calendar event created')
        })
        return console.log('Sorry i is busy')
    }
})