const initial_state: ILogin = {
    isAuth: false,
    token: null,
    email: null,
    name: null,

    loginError: null,
}

const reducer = (state:ILogin = initial_state, action: Action):ILogin => {
    switch (action.type) {
        
        case 'SET_LOGIN_ERROR':
            return {
                ...state,
                token: '',
                email: '',
                isAuth: false,
                name: '',
                loginError: action.value,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.value.token,
                email: action.value.email,
                name: action.value.name,
                isAuth: true,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
                token: '',
                email: '',
                name: '',
                loginError: '',
            }
        default:
            return state
    }
}

export default reducer;
