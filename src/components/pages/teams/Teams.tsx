import React, { FC, useEffect, useState } from 'react'
import { createTeam, getRegisteredUsers, getTeamsList } from '../../../services/index'
import AddTeam from './addTeam/AddTeam'
import CreateTeam from './createTeam/CreateTeam'
import Item from './item/Item'
import './teams.css'

const Teams: FC<{}> = () => {
    const [data, setData] = useState<ITeams[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [createsNumbers, setCreatesNumbers] = useState<number>(0)
    const [error, setError] = useState<string>('')
    const [childChange, setChildChange] = useState<string>('0')


    useEffect(() => {
        getTeamsList()
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => setError(error.message))

        getRegisteredUsers()
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => setError(error.message))
    }, [])

    const deleteTeam = (_id:string) => {
        const newData = data.filter(
            (newDataItem) => newDataItem._id !== _id
        )
        setData(newData)
    }

    const addUser = (teamId: string, userId: string) => {
        const userInfo = users.find((user) => user._id === userId) as IUser
        const newData = [...data]
        const newTeam = newData.find(
            (team) => team._id === teamId) as ITeams
        const newTeamIndex = newData.findIndex(
            (team) => team._id === teamId
        )
        newTeam.members = [...newData[newTeamIndex].members]
        newTeam.members.push({
            userId: (userInfo)?._id,
            email: userInfo?.email,
        })
        newData[newTeamIndex] = newTeam

        setData(newData)
    }


    const create = (newTeam: ITeamsInput) => {
        return createTeam(newTeam).then(response => {
            const newData = [...data];
            newData.push(response.data);
            setData(newData);
            setCreatesNumbers(0)
         return response
         

        }).catch(error => {
            setError(error.message)
            setCreatesNumbers(0)
        })
        // setData(getTeamsList())
    }

    



    return (
        <div className={'teams'}>
            <h2 className={'header'}>Teams</h2>
            <div className={'seprator'} />
            <div className={'teamsText'}>
                View and edit teams you are part of
            </div>
            <div className={'d-flex flex-row flex-wrap justify-content-start align-items-start'} >
                {data.map((dataItem) => {
                    return (
                        <Item
                            key={dataItem.shortName}
                            users={users}
                            data={dataItem}
                            deleteTeam={deleteTeam}
                            addUser={addUser}
                            searchError={error}
                            setSearchError ={setError}
                            childChange ={childChange}
                            setChildChange={setChildChange}
                        />
                    )
                })}
                {new Array(createsNumbers).fill(null).map((_, index) => {
                    return (
                        <CreateTeam 
                        users={users} 
                        key={index} 
                        create={create} 
                        searchError={error} 
                        setSearchError ={setError}
                        childChange ={childChange}
                        setChildChange={setChildChange}
                        />
                    )
                })}
                { 
                createsNumbers === 0 &&
                <AddTeam addNewTeam={() => setCreatesNumbers(createsNumbers === 0 ? 1 : 1) } />
            }
            </div>
        </div>
    )
}


export default Teams
