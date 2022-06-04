import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Trash, Unlock, Logout } from '../../assets/Icons/Icons'
import { useSelectedUsers, useTotalPages, useUsers, useSelectedPage } from '../../contexts/UsersContext'
import { useSnackbar } from 'notistack'
import { getUsers } from '../../api/api'
import './MainPage.scss'
import Pagination from '../../components/Pagination/Pagination'
const UsersTable = React.lazy(() => import('./components/UsersTable/UsersTable'))


const MainPage = () => {
    const token = localStorage.getItem('token')
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [selectedUsers] = useSelectedUsers()
    const [setUsers] = useUsers(true)
    const [isLoading, setIsLoading] = useState(false)
    const [totalPages, setTotalPages] = useTotalPages()
    const [selectedPage, setSelectedPage] = useSelectedPage()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/signIn')
        setSelectedPage(1)
        setTotalPages(1)
    }

    const deleteUsers = async () => {
        if (selectedUsers.length !== 0) {
            try {
                setIsLoading(true)
                await axios.delete('https://taskfourauth.herokuapp.com/api/users/deleteUsers',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${JSON.parse(token)}`
                        },
                        params: {
                            users: selectedUsers
                        }
                    }
                )
                    .then(res => {
                        setIsLoading(false)
                        if (res?.data?.success) {
                            getUsers(setUsers, setTotalPages, selectedPage)
                            enqueueSnackbar('Users are deleted', {
                                variant: 'success'
                            })
                        }
                        if (res?.data?.message === 'User must log out') {
                            logout()
                        }
                    })
            } catch (error) {
                setIsLoading(false)
                console.log(error);
                enqueueSnackbar('Something went wrong, please try again', {
                    variant: 'error'
                })
            }
        } else {
            enqueueSnackbar('Please select the users', {
                variant: 'error'
            })
        }
    }

    const blockUsers = async () => {
        if (selectedUsers.length !== 0) {
            try {
                setIsLoading(true)
                await axios.put('https://taskfourauth.herokuapp.com/api/users/blockUsers', { users: selectedUsers }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(token)}`
                    }
                })
                    .then(res => {
                        setIsLoading(false)
                        if (res?.data?.success) {
                            getUsers(setUsers, setTotalPages, selectedPage)
                            enqueueSnackbar('Users are blocked', {
                                variant: 'success'
                            })
                        }
                        if (res?.data?.message === 'User must log out') {
                            logout()
                        }
                    })
            } catch (error) {
                setIsLoading(false)
                console.log(error);
                enqueueSnackbar('Something went wrong, please try again', {
                    variant: 'error'
                })
            }
        } else {
            enqueueSnackbar('Please select the users', {
                variant: 'error'
            })
        }
    }

    const unblockUsers = async () => {
        if (selectedUsers.length !== 0) {
            try {
                setIsLoading(true)
                await axios.put('https://taskfourauth.herokuapp.com/api/users/unblockUsers', { users: selectedUsers }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        setIsLoading(false)
                        if (res?.data?.success) {
                            getUsers(setUsers, setTotalPages, selectedPage)
                            enqueueSnackbar('Users are unblocked', {
                                variant: 'success'
                            })
                        }
                    })
            } catch (error) {
                setIsLoading(false)
                console.log(error);
                enqueueSnackbar('Something went wrong, please try again', {
                    variant: 'error'
                })
            }
        } else {
            enqueueSnackbar('Please select the users', {
                variant: 'error'
            })
        }
    }

    return (
        <div className='mainPage pt-5'>
            <div className="mainPage-inner container">
                <div className="mainPage-inner-top d-flex align-items-center justify-content-between">
                    <h1 className="mainPage-inner-top-title d3 text-secondary">Users</h1>
                    <div className="mainPage-inner-top-toolbar">
                        <button className="btn btn-outline-secondary me-3 px-2 btn-lock" disabled={isLoading} onClick={blockUsers}><Lock /></button>
                        <button className="btn btn-outline-secondary me-3 px-2 btn-lock" disabled={isLoading} onClick={unblockUsers}><Unlock /></button>
                        <button className="btn btn-danger px-2 me-3" disabled={isLoading} onClick={deleteUsers}><Trash /></button>
                        <button className="btn btn-primary px-2" onClick={logout}><Logout /></button>
                    </div>
                </div>
                <div className="mainPage-inner-main pt-4">
                    <UsersTable />
                    {
                        totalPages > 1 && <Pagination pagesCount={totalPages} selectedPage={selectedPage} setPageFunction={setSelectedPage} />
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage