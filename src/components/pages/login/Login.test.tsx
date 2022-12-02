import Login from './Login';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../state/store';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import userEvent from '@testing-library/user-event';


 jest.mock('axios');
 const mockedAxios = axios as jest.Mocked<typeof axios>

let loginResponse;

beforeEach(() => {

    loginResponse = {data:{

        message : "Signed in sucessfully",
        token: "yJlbWFpbCI6ImFsaXJlemFAZXhhbXBsZS5jb20iLCJ1c2VySWQiOiI2MTc5Njg4NGQxNTBhZDAwMTU1ZTcxNGMiLCJpYXQiOjE2MzY0NjcwMzAsImV4cCI6MTYzNjU1MzQzMH0.suiy2uKUmsxFlU1GZaABkdSKc1pKVFy0zdRouScBsMc",
        email: "alireza@example.com",
        name: "Alireza Yarmahmoodi"
    }}

    mockedAxios.post.mockResolvedValue( loginResponse )

})



test('shows the form when the component loads', () => {
    render(
        <BrowserRouter>
                    <Provider store={store}>
                             <Login />
                    </Provider>
        </BrowserRouter>
    )
    expect(screen.getByTestId('login-form')).toBeInTheDocument()
});

describe('test checking various combination of some user inputs', ()=> {
    
    let submitButton:HTMLElement;
    let emailInput:HTMLElement;
    let passwordInput:HTMLElement;

    beforeEach(()=>{
        render(
            <BrowserRouter>
            <Provider store={store}>
                     <Login />
            </Provider>
        </BrowserRouter>
    );
    
     submitButton =  screen.getByTestId('submit-button');
     emailInput = screen.getByTestId('email-input');
     passwordInput = screen.getByTestId('password-input');

    })

    test('when the user put the email and password and submit the login button the call is make to backend for login',  () =>{
       
        let newUser ={
            email: "alex@example.com",
            password: "Abcd1234!"
        };

    
        userEvent.clear(emailInput);
        userEvent.clear(passwordInput);
        userEvent.type(emailInput, newUser.email);
        userEvent.type(passwordInput, newUser.password);
        userEvent.click(submitButton);
    
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(mockedAxios.post.mock.calls[0][0]).toEqual(`https://mymeetingsapp.herokuapp.com/api/auth/login`);
        expect(mockedAxios.post.mock.calls[0][1]).toEqual({ email: "alex@example.com", password: "Abcd1234!"});
        expect(mockedAxios.post.mock.calls[0][2]).toEqual({headers: {'Content-Type': 'application/json' }});

    console.log(mockedAxios.post.mock.calls[0]);
    });
    
    test('when user try to login with correct format email and incorrect format password without special charachter', ()=>{

        const newUser ={
            email: "alex@example.com",
            password: "Abcd1234"
        };
        userEvent.clear(emailInput);
        userEvent.clear(passwordInput);
        userEvent.type(emailInput, newUser.email);
        userEvent.type(passwordInput, newUser.password);
        userEvent.click(submitButton);

        expect(mockedAxios.post).not.toHaveBeenCalled();
    });

    test('when user try to login with correct format email and incorrect format password without capital case', ()=>{

        const newUser ={
            email: "alex@example.com",
            password: "abcd1234!"
        };
        userEvent.clear(emailInput);
        userEvent.clear(passwordInput);
        userEvent.type(emailInput, newUser.email);
        userEvent.type(passwordInput, newUser.password);
        userEvent.click(submitButton);

        expect(mockedAxios.post).not.toHaveBeenCalled();
    });
  
    test('when user try to login with correct format email and incorrect format password without number', ()=>{

        const newUser ={
            email: "alex@example.com",
            password: "abcdsggdfg!"
        };
        userEvent.clear(emailInput);
        userEvent.clear(passwordInput);
        userEvent.type(emailInput, newUser.email);
        userEvent.type(passwordInput, newUser.password);
        userEvent.click(submitButton);

        expect(mockedAxios.post).not.toHaveBeenCalled();
        
    });
    test('when user try to login with  incorrect format email and correct format password', async ()=>{

        
        const newUser ={
            email: "example.com",
            password: "Abcdsggdf32!"
        };
        userEvent.clear(emailInput);
        userEvent.clear(passwordInput);
        userEvent.type(emailInput, newUser.email);
        userEvent.type(passwordInput, newUser.password);
        userEvent.click(submitButton);
        
        let showError = await screen.findByTestId('login-email-error');

        expect(mockedAxios.post).not.toHaveBeenCalled();
        expect(showError).toHaveTextContent('your email is not valid');
        
    });

})


