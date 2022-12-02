import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import './createTeam.css'

type Props = {
    users: IUser[]
    create: (newTeam: ITeamsInput) => Promise<void | AxiosResponse<ITeams>>
    setSearchError: (teamId: string) => void
    searchError: string,
    childChange: string,
    setChildChange: ( value:string) => void,
}

const CreateTeam = (props: Props) => {
    const { users, create, setSearchError, setChildChange, searchError, childChange } = props

    const [name, setName] = useState('')
    const [shortName, setShortName] = useState('')
    const [des, setDes] = useState('')
    const [currentUser, setCurrentUser] = useState('place-holder')
    const [selectedEmails, setSelectedEmails] = useState<IMembers[]>([])
    const [error, setError] = useState('')
    const [notSelectedUser, setNotSelectedUser] = useState('')
    

    useEffect(() => {
        setError('')
        setSearchError('')
    }, [childChange, setError, setSearchError])


    const createTeam = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            name === '' ||
            shortName === '' ||
            des === '' ||
            selectedEmails.length === 0
        ) {
            setError('Please type the empty field')
            setSearchError('create-team')
            return
        }

        const newTeam = {
            name: name,
            shortName: shortName,
            description: des,
            members: selectedEmails,
        }

        create(newTeam)
            .then((response) => {
                setName('')
                setShortName('')
                setDes('')
                setCurrentUser('place-holder')
                setSelectedEmails([])
                toast('New team was successfully created!')
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    return (
        <div className={'col-12 col-sm-6 col-lg-4 p-3 align-self-stretch'}>
            <Form onSubmit={createTeam} className={'CreateTeamItem'}>
                <Form.Control
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        setError('')
                        setSearchError('create-team')
                        setChildChange(childChange === '0' ? '1' : '0' )
                    }}
                    type="text"
                    className={'my-2'}
                    placeholder="Team name"
                />

                <div style={{ height: 25 }}>
                    {name === '' && error && searchError === 'create-team' && (
                        <Form.Text style={{ color: 'crimson' }}>
                            {' '}
                            Please type your Team name{' '}
                        </Form.Text>
                    )}
                </div>
                <Form.Control
                    value={shortName}
                    onChange={(e) => {
                        setShortName(e.target.value)
                        setError('')
                        setSearchError('create-team')
                        setChildChange(childChange === '0' ? '1' : '0' )
                    }}
                    type="text"
                    className={'my-2'}
                    placeholder="Team short name"
                />
                <div style={{ height: 25 }}>
                    {shortName === '' &&
                        error &&
                        searchError === 'create-team' && (
                            <Form.Text style={{ color: 'crimson' }}>
                                {' '}
                                Please type your Team shortname{' '}
                            </Form.Text>
                        )}
                </div>
                <Form.Control
                    as="textarea"
                    placeholder="Provide a Description for the team"
                    onChange={(e) => {
                        setDes(e.target.value)
                        setError('')
                        setSearchError('create-team')
                        setChildChange(childChange === '0' ? '1' : '0' )
                    }}
                    value={des}
                    style={{ height: '70px',maxHeight:'70px', minHeight:'70px', width: '100%' }}
                    className={'my-2'} 
                />
                <div style={{ height: 25 }}>
                    {des === '' && error && searchError === 'create-team' && (
                        <Form.Text style={{ color: 'crimson' }}>
                            {' '}
                            Please type the description{' '}
                        </Form.Text>
                    )}
                </div>
                <div className={'seprator mt-2'} />
                <span className={'membersContainer'}>
                    <span className={'teams-item-attendees-text'}>
                        Members:{' '}
                    </span>
                    <span>
                        {selectedEmails.map((member) => {
                            return (
                                <span className={'teams-item-email'}>
                                    {member.email}{' '}
                                </span>
                            )
                        })}
                    </span>
                </span>
                <div
                    className={
                        'w-100 d-flex flex-row justify-content-start align-items-center mt-1'
                    }
                >
                    <Form.Select
                        value={currentUser}
                        onChange={(e) => {
                            setCurrentUser(e.target.value)
                            setError('')
                            setSearchError('create-team')
                            setChildChange(childChange === '0' ? '1' : '0' )
                        }}
                        className={'select-user'}
                        style={{
                            color:
                                currentUser === 'place-holder'
                                    ? 'gray'
                                    : 'black',
                        }}
                        aria-label="Default select example"
                    >
                        <option
                            style={{ color: 'gray' }}
                            value={'place-holder'}
                        >
                            select member
                        </option>
                        {users.map((user) => {
                            return (
                                <option
                                    style={{ color: 'black' }}
                                    value={user._id}
                                >
                                    {user.email}
                                </option>
                            )
                        })}
                    </Form.Select>

                    <div
                        className={
                            'w-100 d-flex flex-row justify-content-start align-items-center'
                        }
                    >
                        <Button
                            onClick={() => {

                                if (
                                    currentUser !== 'place-holder' &&
                                    !selectedEmails.find((user) => user.userId === currentUser)
                                ) {
                                    const user  = users.find((user) => user._id === currentUser)as IUser
                                    const member = {
                                                userId: user._id,
                                                email: user.email,
                                            }
                                    const newSelectedEmails = [
                                        ...selectedEmails,
                                    ]
                                    newSelectedEmails.push(member)
                                    setSelectedEmails(newSelectedEmails)
                                    setNotSelectedUser('')
                                    setError('')
                                    setChildChange(childChange === '0' ? '1' : '0' )
                                    console.log('hello')
                                    setCurrentUser('place-holder')
                                } else if (currentUser === 'place-holder') {
                                    setError('Please select a user')
                                } else {
                                    setError('The user is already added!');
                                    setCurrentUser('place-holder');
                                    setNotSelectedUser('the User is already added!')
                                }
                                

                                if ( name === '' || shortName === '' || des === '' || selectedEmails.length === 0)
                                 {
                                   setError('Please select a user')
                                    }
                                
                                setSearchError('create-team')
                            }}
                            className={'AddButton ms-1'}
                        >
                            Add
                        </Button>

                        <Button type="submit" className={'AddButton ms-1'}>
                            Create
                        </Button>
                    </div>
                    </div>
                    <div className={'teams-item-error'}>
                            { currentUser === 'place-holder' && error !== ''  && searchError === 'create-team' && (
                                <div className={'meetingsFilterItemError'}>
                                    {notSelectedUser}
                                </div>
                            )}
                        </div>
                
            </Form>
        </div>
    )
}

export default CreateTeam
