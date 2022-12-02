interface ILogin  {
    isAuth: boolean,
    token: string | null,
    email: string | null,
    name: string | null,
    loginError: string | null,
}

interface IStore {
    login: ILogin
}

type LoginError = {
    type : 'SET_LOGIN_ERROR',
    value : string
}

type LoginSuccess = {
    type : 'LOGIN_SUCCESS',
    
    value: {
        token: string,
        email: string,
        name: string
    }
}

type LogOut = {
    type : 'LOGOUT'
}

type Action = LoginError | LoginSuccess | LogOut