import { submitLogin } from '../../services'
import { validateEmail, validatePassword } from '../../utils/functions'
import UniversalCookie from 'universal-cookie'
import Redux from 'redux'

export const setLoginError = (value: string):Action => {
    return {
        type: 'SET_LOGIN_ERROR',
        value: value,
    }
}

export const loginSuccess = (email: string, token: string, name: string):Action => {
    return {
        type: 'LOGIN_SUCCESS',
        value: {
            email: email,
            token: token,
            name: name,
        },
    }
}



export const login = (email: string, password: string) => {
    return (dispatch: Redux.Dispatch) => {
        if (email === '' || password === '') {
            dispatch(setLoginError('please type the empty field'))
            return
        }
        if (!validateEmail(email)) {
            dispatch(setLoginError('your email is not valid'))
            return
        } else if (!validatePassword(password)) {
            dispatch(setLoginError('your password is not valid'))
            return
        }

        submitLogin(email, password)
            .then((response) => {
                new UniversalCookie().set('token', response.data.token);
                new UniversalCookie().set('name', response.data.name);
                new UniversalCookie().set('email', response.data.email);
                dispatch(
                    loginSuccess(
                        response.data.email,
                        response.data.token,
                        response.data.name
                    )
                )
            })
            .catch((error) => {
                setLoginError(error.message)
            })
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}
