import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { addUserToTeam, excuseTeam } from '../../../../services/index'
import './item.css'

type Props = {
    searchError: string,
    data: ITeams,
    users: IUser[],
    setSearchError: (teamId: string) => void,
    deleteTeam: (_id: string) => void,
    addUser: (teamId: string, userId: string) => void,
    childChange: string,
    setChildChange: ( value:string) => void,
}

const Item = (props: Props) => {
    const { data, users, searchError, childChange, deleteTeam, addUser, setSearchError, setChildChange } = props

    const [currentUser, setCurrentUser] = useState('place-holder')
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setError('')
        setSearchError('')
    }, [childChange, setError, setSearchError])

    const excuse = () => {
        excuseTeam(data._id)
            .then((response) => {
                deleteTeam(data._id)
                toast('You left this team!')
            })
            .catch((error) => {
                setError('error while excusing')
            })
    }

    const add = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSearchError(data._id)
        setCurrentUser('place-holder')
        if (
            currentUser !== 'place-holder' &&
            !data.members.find((member) => member.userId === currentUser)
        ) {
            addUserToTeam(data['_id'], currentUser)
                .then((response) => {
                    addUser(data._id, currentUser)
                })
                .catch((error) => {
                    setError('error while adding user to team')
                })
        } else if (currentUser === 'place-holder') {
            setError('Please select a user')
        } else {
            setError('The user is already added!')
        }
    }

    return (
        <div className={'col-12 col-sm-6 col-lg-4 p-3 align-self-stretch'}>
            <Form onSubmit={add} className={'teams-item h-100'}>
                <div className={'teams-item-title'}>{data.name}</div>
                <div className={'teams-item-shortname'}>@{data.shortName}</div>
                <div className={'teams-item-description'}>
                    {data.description}
                </div>
                <div
                    className={
                        'w-100 mt-1 d-flex flex-row justify-content-start align-items-center'
                    }
                >
                    <Button
                        onClick={excuse}
                        style={{
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            fontSize: '13px',
                        }}
                        variant="danger"
                    >
                        Excuse yourself
                    </Button>
                </div>
                <div className={'seprator mt-2'} />

                <span className={'membersContainer'}>
                    <span className={'teams-item-attendees-text'}>
                        Members:{' '}
                    </span>
                    <span>
                        {data.members.map((member) => {
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
                        'w-100 d-flex flex-row justify-content-start align-items-end flex-grow-1 mt-1'
                    }
                >
                    <Form.Select
                        value={currentUser}
                        onChange={(e) => {
                            setCurrentUser(e.target.value)
                            setSearchError(data._id)
                            setError('')
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
                    <Button type={'submit'} className={'AddButton ms-1'}>
                        Add
                    </Button>
                </div>
                <div className={'teams-item-error'}>
                    {error !== '' && (data._id === searchError) && (
                        <div className={'meetingsFilterItemError'}>{error}</div>
                    )}
                </div>
            </Form>
        </div>
    )
}

export default Item;