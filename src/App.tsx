import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';

const App:FC<{}> = () => {
	return (
		<Switch>
			<Route path={'/'} exact> <Redirect to="/Login" /> </Route>
			<Route path={'/register'} component={Register} />
			<Route path={'/login'} component={Login} />
			<Route path={['/calendar', '/meetings', '/teams']} component={Layout} />
		</Switch>
	)
}

export default App;
