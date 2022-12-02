import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { monthList } from '../../../utils/constance';
import { excuseMeeting } from '../../../services/index';
import { addUserToMeeting } from '../../../services/index';
import './item.css';
import { toast } from 'react-toastify';

type Props = {
    searchError: string,
    meeting: IMeeting,
    users: IUser[],
    setSearchError: (meetingId: string) => void,
    addUser: (meetingId:string, userId:string) => void,
    deleteMeeting: (meetingId:string) => void,
}


const Item = (props:Props) => {
    


    const { meeting, users, searchError, addUser, deleteMeeting, setSearchError  } = props
    const [currentUser, setCurrentUser] = useState('place-holder');
    const [error, setError] = useState<string>('');
    const meetingDate = new Date(meeting.date);


    const add = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSearchError(meeting._id);
        setCurrentUser('place-holder')
        if(currentUser !== 'place-holder' && !meeting.attendees.find(attendee => attendee.userId === currentUser)) {
            addUserToMeeting(meeting['_id'], currentUser).then(response => {
                addUser(meeting['_id'], currentUser)
                
            }).catch(error => {
                setError('Error while adding user to the meeting')
            });
        } else if(currentUser === 'place-holder') {
          setError('Please select a user')
        }else {
            setError('The user is already added!')
        }
    }

    const excuse = () => {
        excuseMeeting(meeting['_id']).then(response => {
            deleteMeeting(meeting['_id']);
            toast('You left this meeting!')
        }).catch(error => {
                setError('Error while excusing');
        });;
    }

    return (
        <div className={'meetingsFilterItem'}>
        <div className={'w-100 d-flex flex-row justify-content-start align-items-center'}>
            <span className={'meetingsFilterItemTitle'}>{`${meetingDate.getDate()} ${monthList[meetingDate.getMonth()]} ${meetingDate.getFullYear()}`}</span>
            <span className={'meetingsFilterItemTime ms-2'}>{`${meeting.startTime.hours}:${meeting.startTime.minutes} - ${meeting.endTime.hours}:${meeting.endTime.minutes}`}</span>

        </div>
    <div className={'meetingsFilterItemName'}>{meeting.name}</div>
   <div className={'w-100 mt-1 d-flex flex-row justify-content-start align-items-center'} > 
   <Button onClick={excuse} style={{paddingTop: '5px' , paddingBottom: '5px' , fontSize: '14px'}} variant="danger">Excuse yourself</Button>
   </div>
   <div className={'filterBoxSeprator my-3'} />
   <div className={'w-100 d-flex flex-row justify-content-start align-items-start'}>
   <span className={'meetingsFilterItemAttendeesText'}>Attendees:</span>
        <div className={'d-flex flex-row justify-content-start align-items-center flex-wrap'}>
            {
                    meeting.attendees.map(attende =>{
                        return (
                            <span className={'meetingsFilterItemEmail'}>{attende.email}</span>
                        )
                    })
            }
        </div>
    </div>
    <div className={'w-100 d-flex flex-row justify-content-start align-items-center'}>
        <Form onSubmit={add} className={'w-100 d-flex flex-row'}>
    <Form.Select  value={currentUser} 
    onChange={(e) => {
        setCurrentUser(e.target.value)
        setSearchError(meeting._id)
        setError('')
        
    }} 
    className={'selectUser'} 
    style={{color: currentUser === 'place-holder' ? 'gray' : 'black'}}
    aria-label="Default select example">
                        <option style={{color: 'gray'}} value={'place-holder'}>Select member</option>

            {
                users.map(user => {
                    return(
                        <option style={{color: 'black'}} value={user._id}>{user.email}</option>
                    )
                })
            }

    </Form.Select>
              <Button type = "submit" className={'addButton'} variant="info">Add</Button>
              { 
                  error !== '' && (meeting._id === searchError) &&
                  <div className={'meetingsFilterItemError'}>{error}</div>
               }
       </Form>
    </div>
</div>
    )
}

export default Item;

