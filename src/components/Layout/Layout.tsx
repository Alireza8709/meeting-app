import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import Calendar from '../pages/calendar/Calendar';
import Meetings from '../pages/meetings/Meetings';
import Teams from '../pages/teams/Teams';
import './layout.css';
import UniversalCookie from 'universal-cookie';
import { loginSuccess } from '../../state/actions/login';


const Layout:FC<{}> = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const name= new UniversalCookie().get('name');
    const token= new UniversalCookie().get('token');
    const email= new UniversalCookie().get('email');

    useEffect(() => {
        if (!token) {
            history.push('/login');
        } else {
                dispatch(loginSuccess(email, token, name));
        }
         
    }, [history, dispatch, email, name, token ])


     

    return (
        <div className={'Layout'}>
            <NavigationMenu />
            <Switch>
                <Route path={'/calendar'} component={Calendar} />
                <Route path={'/meetings'} component={Meetings} />
                <Route path={'/teams'} component={Teams} />
            </Switch>
        </div>
    )
}


export default Layout;


