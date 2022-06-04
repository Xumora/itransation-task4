import React from 'react'

const EmailInput = ({ onChangeFunction, defaultValue }) => {
    return (
        <div className="form-floating mb-3">
            <input type="email" className="form-control shadow-none" id="emailInput" name='email' placeholder="Email" onChange={onChangeFunction} value={defaultValue} />
            <label htmlFor="emailInput">Email</label>
        </div>
    )
}

export default EmailInput