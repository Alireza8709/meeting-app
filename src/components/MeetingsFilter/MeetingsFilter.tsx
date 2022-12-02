import React, { FC, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { searchMeetings } from '../../services/index'
import { getRegisteredUsers } from '../../services/index'
import Item from './Item/Item'
import './meetingsFilter.css'

const MeetingsFilter: FC<{}> = () => {
    const [filterTime, setFilterTime] = useState<string>('all')
    const [filterSearch, setFilterSearch] = useState<string>('')
    const [data, setData] = useState<IMeeting[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [error, setError] = useState<string>('')
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        searchMeetings(filterTime, filterSearch)
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => setError('Error while filtering'))
    }

    useEffect(() => {
        getRegisteredUsers().then((response) => {
            setUsers(response.data)
        })
        .catch(error => setError(error.message))
    }, [])

    const addUser = (meetingId: string, userId: string) => {
        
        const userInfo = users.find((user) => user._id === userId) as IUser
        const newData = [...data]
        const newMeeting = newData.find(
            (meeting) => meeting['_id'] === meetingId
        )as IMeeting
        const newMeetingIndex = newData.findIndex(
            (meeting) => meeting['_id'] === meetingId
        )
        newMeeting.attendees = [...newData[newMeetingIndex].attendees]
        newMeeting.attendees.push({
            userId: (userInfo)?._id,
            email: userInfo?.email,
        })
        newData[newMeetingIndex] = newMeeting

        setData(newData)
    }

    const deleteMeeting = (meetingId: string) => {
        const newData = data.filter(
            (newDataItem) => newDataItem['_id'] !== meetingId
        ) as IMeeting[]
        setData(newData)
    }

    return (
        <React.Fragment>
            <div className={'meetingsFilter'}>
                <div className={'filterBox'}>
                    <h3 className={'filterBoxHeader'}>Search For Meetings</h3>
                    <div className={'filterBoxSeprator'} />
                    <Form className={'w-100'} onSubmit={onSubmit}>
                        <Form.Group className={'mb-3'}>
                            <Form.Label className={'w-100 text-left'}>
                                Date
                            </Form.Label>
                            <Form.Select
                                value={filterTime}
                                onChange={(e) => {
                                    setFilterTime(e.target.value)
                                    setError('');
                                }}
                                className={'mt-1'}
                                aria-label="Default select example"
                            >
                                <option value="all">ALL</option>
                                <option value="past">PAST</option>
                                <option value="today">TODAY</option>
                                <option value="upcoming">UPCOMING</option>
                            </Form.Select>
                            <Form.Label className={'w-100 text-left mt-3 mb-2'}>
                                Search for
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Search using words which describe the meeting"
                                onChange={(e) =>{
                                    setFilterSearch(e.target.value)
                                    setError('');
                                }}
                                value={filterSearch}
                                style={{ height: '100px', width: '100%' }}
                            />
                        </Form.Group>

                        <Button
                            className={
                                ' d-flex flex-row justify-content-start mt-3 searchButton'
                            }
                            variant="primary"
                            type="submit"
                        >
                            Search
                        </Button>
                    </Form>
                </div>
            </div>
            <h3 className={'header mt-3'}>Meetings matching search criteria</h3>
            <div className={'filterBoxSeprator'} />

            {data.length === 0 && <div>Use the form to search for meeting</div>}

            {data.map((meeting) => {
                return (
                    <Item
                        key={meeting['_id']}
                        meeting={meeting}
                        users={users}
                        searchError={error}
                        setSearchError ={setError}
                        addUser={addUser}
                        deleteMeeting={deleteMeeting}
                    />
                )
            })}
        </React.Fragment>
    )
}

export default MeetingsFilter
