interface IMembers {
    "userId": string,
    "email": string
}






interface ITeams {
        "_id": string,
        "name": string,
        "shortName": string,
        "description": string,
        "members": IMembers[]
}




interface ITeamsInput {
   
    "name": string,
    "shortName": string,
    "description": string,
    "members": IMembers[]
    
}