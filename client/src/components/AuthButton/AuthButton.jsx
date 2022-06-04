import React from 'react'

const AuthButton = ({ isLoading, text, onClickFunction }) => {
    return (
        <button className='btn btn-primary w-100 d-flex align-items-center justify-content-center' onClick={onClickFunction} disabled={isLoading}>
            {
                isLoading && <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
            {
                !isLoading && <span className='fs-5'>{text}</span>
            }
        </button>
    )
}

export default AuthButton