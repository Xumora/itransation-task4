import React from 'react'
import { useState } from 'react'
import { ClosedEye, Eye } from '../../assets/Icons/Icons'

const PasswordInput = ({ onChangeFunction, defaultValue }) => {
    const [isPassword, setIsPassword] = useState(true)

    return (
        <div className='d-flex mb-5 bg-white rounded border'>
            <div className="form-floating w-100">
                <input type={isPassword ? "password" : "text"} className="form-control border-0 shadow-none" id="passwordInput" name='password' placeholder="Password" autoComplete="new-password" onChange={onChangeFunction} value={defaultValue} />
                <label htmlFor="passwordInput">Password</label>
            </div>
            <button className='btn bg-white shadow-none' onClick={() => setIsPassword(!isPassword)}>
                {isPassword ? <Eye /> : <ClosedEye />}
            </button>
        </div>
    )
}

export default PasswordInput