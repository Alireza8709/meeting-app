import axios from "axios";
import UniversalCookie from 'universal-cookie';



export const submitRegister = (name: string, email: string, password: string) => {
    return axios.post('https://mymeetingsapp.herokuapp.com/api/auth/register', 
    {name: name, email: email, password : password},
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
};



    export const submitLogin = (email: string, password:string) => {
    return axios.post('https://mymeetingsapp.herokuapp.com/api/auth/login',
     {email: email, password: password},
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
};

export const getCalenderDayInfo = (date:string) => {
    return axios.get(`https://mymeetingsapp.herokuapp.com/api/calendar?date=${date}`, 
    {
        headers: {
            'Content-Type': 'application/json',
            'authorization': new UniversalCookie().get('token')
        }
    }
    )
};

export const searchMeetings = (dropId:string, search:string) =>{
    return axios.get(`https://mymeetingsapp.herokuapp.com/api/meetings`,
    {
        headers: {
            'Content-Type': 'application/json',
            'authorization': new UniversalCookie().get('token')
        },
        params : {
            period : dropId,
            search: search
        } 
    }
    )
};

export const getRegisteredUsers = () => {
    return axios.get(`https://mymeetingsapp.herokuapp.com/api/users`,

{
    headers : {
        'Content-Type': 'application/json',
        'authorization': new UniversalCookie().get('token')
   
    } 
}
    )
    
};


export const addUserToMeeting = (meetingId: string, userId:string) => {
    return axios.patch(`https://mymeetingsapp.herokuapp.com/api/meetings/${meetingId}`,
    null,
    {
    params : {
        action : "add_attendee",
        userId : userId
    },
    headers : {
        
        'authorization': new UniversalCookie().get('token')
    }
}
    )
}



export const excuseMeeting = (meetingId: string) => {
    return axios.patch(`https://mymeetingsapp.herokuapp.com/api/meetings/${meetingId}`,
    null,
    {
    params : {
        action : 'remove_attendee',
    },
    headers : {
        'authorization': new UniversalCookie().get('token')
    }
 }
    )
};

export const addMeeting = (newMeeting:IMeetingInput) => {
    return axios.post(`https://mymeetingsapp.herokuapp.com/api/meetings`,
    newMeeting,
    {
        headers: {
            'Content-Type': 'application/json',
            'authorization': new UniversalCookie().get('token')
        }
    }
    )
};


export const getTeamsList = () => {
    return axios.get<ITeams[]>(`https://mymeetingsapp.herokuapp.com/api/teams`,
    {
        headers : {
            'Content-Type': 'application/json',
            'authorization': new UniversalCookie().get('token')
       
        } 
    }
        )
};


export const addUserToTeam = (teamId:string, userId:string) => {
    return axios.patch<ITeams>(`https://mymeetingsapp.herokuapp.com/api/teams/${teamId}`,
    null,
    {
    params : {
        action : "add_member",
        userId : userId
    },
    headers : {
        
        'authorization': new UniversalCookie().get('token')
    }
}
    )
};


export const excuseTeam = (teamId: string) => {
    return axios.patch<ITeams>(`https://mymeetingsapp.herokuapp.com/api/teams/${teamId}`,
    null,
    {
    params : {
        action : 'remove_member',
    },
    headers : {
        'authorization': new UniversalCookie().get('token')
    }
 }
    )
};


export const createTeam = (newTeam: ITeamsInput) => {
    return axios.post<ITeams>(`https://mymeetingsapp.herokuapp.com/api/teams`,
    newTeam,
    {
        headers: {
            'Content-Type': 'application/json',
            'authorization': new UniversalCookie().get('token')
        }
    }
    )
};