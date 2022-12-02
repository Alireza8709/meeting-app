import React, { FC, useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { Route, useHistory } from 'react-router';
import AddMeeting from '../../AddMeeting/AddMeeting';
import MeetingsFilter from '../../MeetingsFilter/MeetingsFilter';
import './meetings.css'

const Meetings: FC<{}> = () => {
    const [key, setKey] = useState<string>('filter-meeting');

    const history = useHistory();

    useEffect(() => {
        if(history.location.pathname === '/meetings/add') {
            setKey('add-meeting');
        }
    }, [history.location.pathname]);

    return (
        <div className={'meetings'}>
            <h2 className={'header'}>Meetings</h2>
            <div className={'seprator'} />

            <Tabs
                defaultActiveKey="profile"
                onSelect={(k) => {
                    setKey(k as string);
                    if(k=== 'filter-meeting'){
                        history.push('/meetings')
                    } else {
                        history.push('/meetings/add')
                    }
                }}
                activeKey={key}
                id="uncontrolled-tab-example"
                className="mb-3 w-100 mt-2"
            >
                <Tab eventKey="filter-meeting"title="Filter / Search meetings" />
                <Tab eventKey="add-meeting" title="Add a meeting" />
            </Tabs>
            <Route exact path={'/meetings'} component={MeetingsFilter} />
            <Route exact path={'/meetings/add'} component={AddMeeting} />
        </div>
    )
}

export default Meetings
