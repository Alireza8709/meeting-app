import React, { FC, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { monthList, weekList } from '../../../utils/constance'
import './calendar.css'
import { getCalenderDayInfo } from '../../../services'

const Calendar: FC<{}> = () => {
    
    
    const [day, setDay] = useState<Date>(new Date())
    const [data, setData] = useState<IMeeting[]>([])

    useEffect(() => {
        const meetingDay = day.toISOString().substr(0, 10)
        getCalenderDayInfo(meetingDay).then((response) =>
            setData(response.data)
        )
    }, [day])

    //miliseconds per day 
    const allDay = 24 * 60 * 60 * 1000;

    return (
        <div className={'calendar'}>
            <h2 className={'header'}>Calendar</h2>

            <div className={'seprator'} />
            <div className={'dayContainer'}>
                <div
                    className={
                        'd-flex flex-column justify-content-start align-items-start'
                    }
                >
                    <h3 className={'date'}>{`${day.getDate()} ${
                        monthList[day.getMonth()]
                    } ${day.getFullYear()}`}</h3>
                    <div className={'weekDay'}>{weekList[day.getDay()]}</div>
                </div>
                <div className={'calendarDatePickerContainer'}>
                    <DatePicker 
                        dateFormat="yyyy/MM/dd"
                        selected={day}
                        onChange={(date) => setDay(date as Date)}
                    />
                </div>
            </div>
            <div className={'CalendarViewer'}>
                {new Array(24).fill(null).map((_, hour_index) => {
                    return (
                        <div className={'HourItem'}>
                            <span className={'HourItemText'}>{hour_index}</span>
                            <div className={'HourItemBlueBox'} />
                        </div>
                    )
                })}

                {data.map((meeting) => {
                    //date object of day from start of day(0:00:00)
                    const date = new Date(meeting.date.substr(0, 10) + ':')
                    // make a date object and get the timestamp of starting the meeting
                    const start = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        meeting.startTime.hours,
                        meeting.startTime.minutes
                    ).getTime()
                    // make a date object and get the timestamp of end the meeting
                    const end = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        meeting.endTime.hours,
                        meeting.endTime.minutes
                    ).getTime()

                    const startTimestamp = start - date.getTime()
                    const endTimestamp = end - date.getTime()
                    if (
                        startTimestamp > allDay ||
                        startTimestamp < 0 ||
                        endTimestamp > allDay ||
                        endTimestamp < 0 ||
                        endTimestamp < startTimestamp
                    ) {
                        return null
                    }
                    const top = (startTimestamp * 100) / allDay
                    const height =
                        ((endTimestamp - startTimestamp) * 100) / allDay
                    return (
                        <div
                            className={'MeetingItem'}
                            style={{ top: `calc(${top}% + 5px)`, height: `calc(${height}% - 5px)` }}
                        >
                            <div className={'MeetingItemTitle'}>
                                {meeting.name}
                            </div>
                            <hr style={{ margin: '5px 0' }} />
                            <div
                                className={
                                    'w-100 d-flex flex-row justify-content-start align-items-center flex-wrap'
                                }
                            >
                                {meeting.attendees.map((attendee) => {
                                    return (
                                        <div className={'attendee'}>
                                            {attendee.email}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Calendar
