import React, { FC, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { toast } from 'react-toastify'
import { addMeeting } from '../../services/index'

import './addMeeting.css'

const AddMeeting: FC<{}> = () => {
    const [date, setDate] = useState<Date | [Date | null, Date | null] | null>(
        new Date()
    )

    const [name, setName] = useState<string>('')
    const [startMinute, setStartMinute] = useState<string>('0')

    const [endMinute, setEndMinute] = useState<string>('0')

    const [startHour, setStartHour] = useState<string>('0')

    const [endHour, setEndHour] = useState<string>('0')

    const [desText, setDesText] = useState<string>('')
    const [members, setMembers] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [dateError, setDateError] = useState<string>('')


    let startDate:(any) = null;
    let endDate:(any) = null;

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name === '' || startMinute === '' || endMinute === '' || startHour === '' || endHour === '' || desText === '' || members === '') {
            setError('Please type the empty field')
            
        }
       
         startDate = new Date(
            (date as Date).getFullYear(),
            (date as Date).getMonth(),
            (date as Date).getDate(),
            parseInt(startHour),
            parseInt(startMinute)
        )
         endDate = new Date(
            (date as Date).getFullYear(),
            (date as Date).getMonth(),
            (date as Date).getDate(),
            parseInt(endHour),
            parseInt(endMinute)
        )

        if (endDate.getTime() <= startDate.getTime()) {
            setDateError('Start time must be before end time')
            return
        } else {
            setDateError('')

        }

        

        const newMeeting = {
            name: name,
            description: desText,
            date: (date as Date).toISOString().substr(0, 10),
            startTime: {
                hours: parseInt(startHour),
                minutes: parseInt(startMinute),
            },
            endTime: {
                hours: parseInt(endHour),
                minutes: parseInt(endMinute),
            },
            attendees: members.split(',').map(email => email.trim() ),
        }

        addMeeting(newMeeting)
            .then((response) => {
                setDate(new Date())
                setName('')
                setStartMinute('0')
                setStartHour('0')
                setEndMinute('0')
                setEndHour('0')
                setDesText('')
                setMembers('')
                toast('Meeting was successfully created!')
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    useEffect(() => {
        setError('')
        setDateError('')
    }, [
        date,
        name,
        startHour,
        startMinute,
        endHour,
        endMinute,
        desText,
        members
    ])

    return (
        <div className={'addMeetingContainer'}>
            <h3 className={'addMeetingHeader'}>Add a new meeting</h3>
            <div className={'addMeetingSeperator'} />
            <Form onSubmit={(event) => submit(event)} style={{ width: '100%' }}>
                <Form.Label className={'addMeetingLabel'}>Meeting name</Form.Label>
                <Form.Control
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        setError('')
                    }}
                    type="text"
                    placeholder="What is the name of your meeting?"
                />
                 <div style={{height: 25}}>
                     {name === '' && error &&  <Form.Text style={{ color: 'crimson'}}>   Please type your meeting name  </Form.Text> }
                    </div>

                <Form.Label className={'addMeetingLabel'}>Date</Form.Label>
                <DatePicker
                    className={'w-100'}
                    dateFormat="yyyy/MM/dd"
                    selected={date as Date}
                    onChange={(newDate) => {
                        setDate(newDate)
                        setError('')
                    }}
                />
              
                <Form.Label className={'addMeetingLabel mt-2'}>
                    Start time (hh:mm)
                </Form.Label>
                <div
                    className={
                        'w-100 d-flex flex-row justify-content-start align-items-center'
                    }
                >
                    <Form.Select
                        value={startHour}
                        onChange={(e) => {
                            setStartHour(e.target.value)
                            setError('')
                        }}
                        style={{ width: '69px' }}
                        aria-label="Default select example"
                    >
                        {new Array(24).fill(null).map((_, index) => {
                            return <option value={`${index}`}>{index}</option>
                        })}
                    </Form.Select>
                    <div style={{ marginLeft: '8px' }}>:</div>
                    <Form.Select
                        value={startMinute}
                        onChange={(e) => {
                            setStartMinute(e.target.value)
                            setError('')
                        }}
                        style={{ width: '69px', marginLeft: '10px' }}
                        aria-label="Default select example"
                    >
                        {new Array(60).fill(null).map((_, index) => {
                            return <option value={`${index}`}>{index}</option>
                        })}
                    </Form.Select>
                </div>
                <Form.Label className={'addMeetingLabel mt-2'}>
                    End time (hh:mm)
                </Form.Label>
                <div
                    className={
                        'w-100 d-flex flex-row justify-content-start align-items-center'
                    }
                >
                    <Form.Select
                        value={endHour}
                        onChange={(e) => {
                            setEndHour(e.target.value)
                            setError('')
                        }}
                        style={{ width: '69px' }}
                        aria-label="Default select example"
                    >
                        {new Array(24).fill(null).map((_, index) => {
                            return <option value={`${index}`}>{index}</option>
                        })}
                    </Form.Select>

                    <div style={{ marginLeft: '8px' }}>:</div>
                    <Form.Select
                        value={endMinute}
                        onChange={(e) => {
                            setEndMinute(e.target.value)
                            setError('')
                        }}
                        style={{ width: '69px', marginLeft: '10px' }}
                        aria-label="Default select example"
                    >
                        {new Array(60).fill(null).map((_, index) => {
                            return <option value={`${index}`}>{index}</option>
                        })}
                    </Form.Select>
                </div>
                <div style={{height: 25}}>
                {error !== '' && dateError !== ''  &&  <Form.Text style={{ color: 'crimson'}}>   Start time must be before end time  </Form.Text> }
                </div>
                <Form.Label className={'addMeetingLabel mt-2'}>
                    Description
                </Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="What is agenda of the meeting?"
                    onChange={(e) => {
                        setDesText(e.target.value)
                        setError('')
                    }}
                    value={desText}
                    style={{ height: '70px', width: '100%' }}
                />
                     <div style={{height: 25}}>
                     {desText === '' && error &&  <Form.Text style={{ color: 'crimson'}}>   Please type the description </Form.Text> }
                    </div>

                <Form.Label className={'addMeetingLabel mt-2'}>
                    EmailIDs of attendees, or team's short
                </Form.Label>
                <Form.Control
                    value={members}
                    onChange={(e) => {
                        setMembers(e.target.value)
                        setError('')
                    }}
                    type="text"
                    placeholder="john@example.com, @annual-day, mark@example.com"
                />

                    <div style={{height: 25}}>
                     {members === '' && error &&  <Form.Text style={{ color: 'crimson'}}> Please choose a member </Form.Text> }
                    </div>

                <Form.Text style={{ color: 'white', fontSize: '13px' }}>
                    Separate emailids / team short names by commas - team short
                    names always begin with @
                </Form.Text>
                <div
                    className={
                        'd-flex flex-row justify-content-start align-items-center w-100 '
                    }
                >
                    <Button
                        type={'submit'}
                        className={'addButton'}
                        variant="info"
                    >
                        Add meeting
                    </Button>
                </div>
     
            </Form>
        </div>
    )
}

export default AddMeeting
