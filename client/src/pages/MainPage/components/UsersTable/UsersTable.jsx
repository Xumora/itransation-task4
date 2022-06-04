import React, { useEffect, useState } from 'react'
import { useSelectedPage, useSelectedUsers, useTotalPages, useUsers } from '../../../../contexts/UsersContext'
import { getUsers } from '../../../../api/api'
import moment from 'moment'
import TableRowShimmer from '../../../../components/TableRowShimmer/TableRowShimmer'
import './UsersTable.scss'



const UsersTable = () => {
    const [selectedUsers, setSelectedUsers] = useSelectedUsers()
    const [users, setUsers] = useUsers()
    const [setTotalPages] = useTotalPages(true)
    const [selectedPage] = useSelectedPage()
    const [dataLoading, setDataLoading] = useState(false)

    useEffect(() => {
        getUsers(setUsers, setTotalPages, selectedPage, setDataLoading)
    }, [setUsers, setTotalPages, selectedPage, setDataLoading])

    useEffect(() => {
        setSelectedUsers([])
        document.getElementById('chooseAllCheckbox').checked = false
    }, [selectedPage, setSelectedUsers])

    const chooseAll = (event) => {
        if (event.target.checked) {
            let newSelectedUsers = [];
            users?.map(element => (
                newSelectedUsers.push(element._id)
            ))
            setSelectedUsers([...newSelectedUsers])
        } else {
            setSelectedUsers([])
        }
    }

    const addSelectedUser = (event) => {
        if (event.target.checked) {
            setSelectedUsers([...selectedUsers, event.target.id])
        } else {
            let selectedUser = selectedUsers.find(element => element === event.target.id)
            let indexOfSelectedUser = selectedUsers.indexOf(selectedUser)
            let newSelectedUsers = [...selectedUsers]
            newSelectedUsers.splice(indexOfSelectedUser, 1)
            setSelectedUsers([...newSelectedUsers])
        }
    }


    return (
        <div className='usersTable border rounded overflow-md-hidden'>
            <div className="usersTable-row d-flex py-3">
                <div className="usersTable-row-col d-flex align-items-center justify-content-center">
                    <input className="form-check-input" type="checkbox" id="chooseAllCheckbox" onChange={chooseAll} />
                </div>
                <div className="usersTable-row-col fw-bolder">ID</div>
                <div className="usersTable-row-col fw-bolder">Username</div>
                <div className="usersTable-row-col fw-bolder">Email</div>
                <div className="usersTable-row-col fw-bolder">Registration date</div>
                <div className="usersTable-row-col fw-bolder">Last login</div>
                <div className="usersTable-row-col fw-bolder">Status</div>
            </div>
            {
                !dataLoading ? users.map((element, index) => {
                    return <div className='usersTable-row d-flex py-2 border-top' key={element._id}>
                        <div className="usersTable-row-col d-flex align-items-center justify-content-center">
                            <input className="form-check-input" type="checkbox" id={element._id} onChange={addSelectedUser} checked={selectedUsers.includes(element._id)} />
                        </div>
                        <div className="usersTable-row-col">{(selectedPage - 1) * 10 + index + 1}</div>
                        <div className="usersTable-row-col">{element.username}</div>
                        <div className="usersTable-row-col">{element.email}</div>
                        <div className="usersTable-row-col">{
                            moment.utc(element.registrationDate).local().format('DD.MM.YYYY')
                        }</div>
                        <div className="usersTable-row-col">{
                            moment.utc(element.latestLogin).local().format('DD.MM.YYYY')
                        }</div>
                        <div className="usersTable-row-col d-flex align-items-center justify-content-center">
                            <span className={`badge rounded-circle p-0 me-2 mt-1 ${element.status === 0 ? 'bg-danger' : 'bg-success'}`}>
                                <span className="visually-hidden">status</span>
                            </span>
                            {element.status === 0 ? 'blocked' : 'active'}
                        </div>
                    </div>
                }) : <>
                    <TableRowShimmer />
                    <TableRowShimmer />
                    <TableRowShimmer />
                    <TableRowShimmer />
                </>
            }
        </div>
    )
}

export default UsersTable