interface IAttendee {
        "userId": string,
        "email": string
}



interface IMeeting {
    "_id": string,
    "name": string,
    "description": string,
    "date": string,
    "startTime": {
        "hours": number,
        "minutes": number
    },
    "endTime": {
        "hours": number,
        "minutes": number
    },
    "attendees": IAttendee[],
}

//add new meeting interface
interface IMeetingInput {
  
    "name": string,
    "description": string,
    "date": string,
    "startTime": {
        "hours": number,
        "minutes": number
    },
    "endTime": {
        "hours": number,
        "minutes": number
    },
    "attendees": Array<string>
}