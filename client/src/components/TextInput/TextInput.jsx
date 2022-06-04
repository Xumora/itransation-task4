import React from 'react'

const TextInput = ({ onChangeFunction, defaultValue }) => {
    return (
        <div className="form-floating mb-3">
            <input type="text" className="form-control shadow-none" id="textInput" name='username' placeholder="Username" onChange={onChangeFunction} value={defaultValue} />
            <label htmlFor="textInput">Username</label>
        </div>
    )
}

export default TextInput