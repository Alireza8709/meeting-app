import React, { useState, FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import './register.css'
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from '../../../utils/functions'
import NavigationMenu from '../../NavigationMenu/NavigationMenu'
import { submitRegister } from '../../../services'
import { useHistory } from 'react-router'

const Register:FC<{}> = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [confirmValid, setConfirmValid] = useState(false)

    const [registerError, setRegisterError] = useState('')

    const history = useHistory()

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (name === '' || email === '' || password === '' || confirm === '') {
            setRegisterError('Please type the empty field')
            return
        }
        if (!emailValid) {
            setRegisterError('Your email is not valid')
            return
        } else if (!passwordValid) {
            setRegisterError('Your password is not valid')
            return
        } else if (!confirmValid) {
            setRegisterError('Your password confirm is not valid')
            return
        }

        submitRegister(name, email, password)
            .then((response) => {
                history.push('/login')
            })
            .catch((error) => {
                setRegisterError(error.message)
            })
    }

    return (
        <div className={'RegisterContainer'}>
            <NavigationMenu />
            <Form 
            className={'registerFormContainer'}
             onSubmit={(event) => submit(event)} noValidate>
                <Form.Group className="mb-3" controlId="name">
                    <h1>Signup</h1>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setName(e.target.value);
                            setRegisterError('')
                        }}
                        value={name}
                        placeholder="Full name "/>
                        <div style={{height: 16}}>
                    <Form.Text className="text-muted">
                        {name === '' ? 'Please type your full name' : ''}
                    </Form.Text>
                        </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailValid(validateEmail(e.target.value))
                            setRegisterError('')
                        }}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                    />
                     <div style={{height: 16}}>
                    <Form.Text style={{ color: emailValid || (email === '' && !registerError) ? 'gray' : 'crimson'}}>
                        {email === ''
                            ? 'Please type your email '
                            : emailValid
                            ? ''
                            : 'Your email is not valid'}
                    </Form.Text>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordValid(validatePassword(e.target.value))
                            setRegisterError('')
                        }}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                     <div style={{height: 40}}>
                    <Form.Text style={{ color: passwordValid || (password === '' && !registerError) ? 'gray' : 'crimson'}}>
                        {password === ''
                            ? 'password must have 8 characters, one uppercase, one lowercase, one number and one special character'
                            : passwordValid
                            ? ''
                            : 'Your password is not valid'}
                    </Form.Text>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setConfirm(e.target.value)
                            setConfirmValid(
                                validateConfirmPassword(
                                    password,
                                    e.target.value
                                )
                            )
                            setRegisterError('')
                        }}
                        value={confirm}
                        type="password"
                        placeholder="Password"
                    />
                     <div style={{height: 16}}>
                    <Form.Text style={{ color: confirmValid || (confirm === '' && !registerError) ? 'gray' : 'crimson'}}>
                        {confirm === ''
                            ? 'Please confirm your password'
                            : confirmValid
                            ? ''
                            : 'Your confirm password is not valid'}
                    </Form.Text>
                    </div>
                </Form.Group>
                <Button className={'registerButton'} variant="primary" type="submit">
                    Register
                </Button>
                
            </Form>
        </div>
    )
}

export default Register
