import React, { FC } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Route, Switch, useHistory, useLocation } from 'react-router'
import './navigationMenu.css'
import { logout } from '../../state/actions/login'
import { useDispatch, useSelector } from 'react-redux'
import UniversalCookie from 'universal-cookie'
import { NavLink } from 'react-router-dom'

const NavigationMenu: FC<{}> = () => {
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()

    
    const { email } = useSelector<IStore, ILogin>((state) => {
        return state.login
    })
    const logoutClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        new UniversalCookie().remove('token')
        dispatch(logout())
        history.push('/login')
    };

    let pageDetector = '';
      if(location.pathname.indexOf('/calendar') === 0 ) {
        pageDetector = 'My Meeting';
    } else if (location.pathname.indexOf('/meetings') === 0 ) {
        pageDetector = 'My Meetings';
    } else if (location.pathname.indexOf('/teams') === 0 ) {
        pageDetector = 'My Meeting';
    } else if (location.pathname.indexOf('/login') === 0 ) {
        pageDetector = 'Already have an account ?';
    } else if (location.pathname.indexOf('/register') === 0 ) {
        pageDetector = 'Create an account';
    }


    return (
        <Switch>
            <Route
                exact
                path={['/register', '/login']}
                component={() => {
                    return (
                        <Navbar
                            expand="lg"
                            bg="light"
                            variant="light"
                            style={{ width: '100%', paddingTop: 0, paddingBottom: 0 }}
                        >
                            <Container>
                            {<div className={'NavbarPageDetector'}>{pageDetector}</div>}
                                <Navbar.Brand as={NavLink}  to="#home"></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav2" />
                            
                                <Navbar.Collapse id="basic-navbar-nav2">
                                    <Nav className={'ms-auto'}>
                                        <Nav.Link 
                                        className = {`NavStyle ${location.pathname.indexOf('/register') === 0 ? 'active' : ''}`}
                                        as={NavLink}
                                            active={
                                                location.pathname ===
                                                '/register'
                                            }
                                            to="/register"
                                        >
                                            Register
                                        </Nav.Link>
                                        <Nav.Link
                                            className = {`NavStyle ${location.pathname.indexOf('/login') === 0 ? 'active' : ''}`}
                                            as={NavLink}
                                            active={
                                                location.pathname === '/login'
                                            }
                                            to="/login"
                                        >
                                            Login
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    )
                }}
            />

            <Route
                path={['/calendar', '/meetings', '/teams']}
                component={() => {
                    return (
                        <Navbar
                            expand="lg"
                            bg="light"
                            variant="light"
                            style={{ width: '100%', paddingTop: 0, paddingBottom: 0 }}
                        >
                            <Container>
                                {<div className={'NavbarPageDetector'}>{pageDetector}</div>}
                                <Navbar.Brand href="#home"></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                    <Nav.Link 
                                    className={'d-lg-none'}
                                    as = "div">
                                            {' '}
                                            Welcome
                                            
                                            <span className={'Email ms-2'}>
                                                {email}
                                            </span>{' '}
                                         </Nav.Link>

                                        <Nav.Link
                                        className = {`NavStyle ${location.pathname.indexOf('/calendar') === 0 ? 'active' : ''}`}
                                            as={NavLink}
                                            active={
                                                location.pathname ===
                                                '/calendar'
                                            }
                                            to="/calendar"
                                        >
                                            Calendar
                                        </Nav.Link>
                                        <Nav.Link
                                        className = {`NavStyle ${location.pathname.indexOf('/meetings') === 0 ? 'active' : ''}`}
                                            as={NavLink}
                                            active={
                                                location.pathname ===
                                                '/meetings'
                                            }
                                            to="/meetings"
                                        >
                                            Meetings
                                        </Nav.Link>
                                        <Nav.Link
                                        className = {`NavStyle ${location.pathname.indexOf('/teams') === 0 ? 'active' : ''}`}
                                            as={NavLink}
                                            active={
                                                location.pathname === '/teams'
                                            }
                                            to="/teams"
                                        >
                                            Teams
                                        </Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link 
                                        className={'d-none d-lg-block'}
                                        as = "div">
                                            {' '}
                                            Welcome
                                            
                                            <span className={'Email ms-2'}>
                                                {email}
                                            </span>{' '}
                                         </Nav.Link>
                                        <Nav.Link 
                                       
                                        as = {Button} className={'d-inline NavStyleLogout'}
                                            
                                            onClick={(event) =>
                                                logoutClicked(event)
                                            }
                                            variant="light"
                                        >
                                            Logout
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    )
                }}
            />
        </Switch>
    )
}

export default NavigationMenu

