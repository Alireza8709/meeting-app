import React, { useState, FC, useEffect } from 'react'
import './login.css'
import { validateEmail, validatePassword } from '../../../utils/functions'
import NavigationMenu from '../../NavigationMenu/NavigationMenu'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { login, setLoginError } from '../../../state/actions/login'
import { useDispatch, useSelector } from 'react-redux'
import UniversalCookie from 'universal-cookie';

const Login:FC<{}> = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()


    const token= new UniversalCookie().get('token');

    useEffect(() => {
        if (token) {
            history.push('/calendar');
       
        }
    }, [history, token])


    const { loginError, isAuth } = useSelector<IStore, ILogin>((state) => {
        return state.login
    })

    if (isAuth === true) {
        history.push('/calendar')
    }

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className={'LoginContainer'}>
            <NavigationMenu />
            <Form
                onSubmit={(event) => submit(event)}
                className={'loginFormContainer'}
                noValidate
                data-testid={'login-form'}
            >
                <h1>SignIn</h1>

                <Form.Group  className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailValid(validateEmail(e.target.value));
                            dispatch(setLoginError(''));
                        }}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                        data-testid={'email-input'}
                    />
                     <div style={{height: 16}}>
                    <Form.Text data-testid="login-email-error" style={{ color: emailValid || (email === '' && !loginError) ? 'gray' : 'crimson'}}>
                        {email === ''
                            ? 'please type your email'
                            : emailValid
                            ? ''
                            : 'your email is not valid'}
                    </Form.Text>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordValid(validatePassword(e.target.value));
                            dispatch(setLoginError(''));
                        }}
                        value={password}
                        type="password"
                        placeholder="Password"
                        data-testid={'password-input'}
                    />
                     <div style={{height: 16}}>
                    <Form.Text data-testid="login-password-error"  style={{ color: passwordValid || (password === '' && !loginError) ? 'gray' : 'crimson'}}>
                        {password === ''
                            ? 'please type your password'
                            : passwordValid
                            ? ''
                            : 'your password is not valid'}
                    </Form.Text>
                    </div>
                </Form.Group>
                <Button className={'loginButton'} data-testid={'submit-button'} variant="primary" type="submit">
                    Login
                </Button>
               
            </Form>
        </div>
    )
}

export default Login;

