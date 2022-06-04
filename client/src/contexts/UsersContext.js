import React, { createContext, useContext, useState } from 'react'
const Context = createContext()


const UsersContext = ({ children }) => {
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [selectedPage, setSelectedPage] = useState(1)

    const value = {
        selectedUsers,
        setSelectedUsers,
        users,
        setUsers,
        totalPages,
        setTotalPages,
        selectedPage,
        setSelectedPage
    }

    return (
        <Context.Provider value={value}>
            <Context.Consumer>
                {
                    () => children
                }
            </Context.Consumer>
        </Context.Provider>
    )
}

const useSelectedUsers = (setterOnly) => {
    const { selectedUsers, setSelectedUsers } = useContext(Context)
    return setterOnly ? [setSelectedUsers] : [selectedUsers, setSelectedUsers]
}

const useUsers = (setterOnly) => {
    const { users, setUsers } = useContext(Context)
    return setterOnly ? [setUsers] : [users, setUsers]
}

const useTotalPages = (setterOnly) => {
    const { totalPages, setTotalPages } = useContext(Context)
    return setterOnly ? [setTotalPages] : [totalPages, setTotalPages]
}

const useSelectedPage = (setterOnly) => {
    const { selectedPage, setSelectedPage } = useContext(Context)
    return setterOnly ? [setSelectedPage] : [selectedPage, setSelectedPage]
}

export {
    UsersContext,
    useSelectedUsers,
    useUsers,
    useTotalPages,
    useSelectedPage
}