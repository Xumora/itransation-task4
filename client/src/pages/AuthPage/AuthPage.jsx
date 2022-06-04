import React from 'react'
import { Outlet } from 'react-router-dom'
import './AuthPage.scss'


const AuthPage = () => {

    return (
        <div className='authPage d-flex justify-content-center'>
            <Outlet />
        </div>
    )
}

export default AuthPage