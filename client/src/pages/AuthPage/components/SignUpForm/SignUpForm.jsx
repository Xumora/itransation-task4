import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import axios from 'axios'
import PasswordInput from '../../../../components/PasswordInput/PasswordInput';
import TextInput from '../../../../components/TextInput/TextInput';
import EmailInput from '../../../../components/EmailInput/EmailInput';
import AuthButton from '../../../../components/AuthButton/AuthButton';
import { validateEmail } from '../../../../functions/functions';


const SignUpForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        if (form.username !== '' && form.email !== '' && form.password !== '' && validateEmail(form.email)) {
            setIsLoading(true)
            try {
                await axios.post('https://taskfourauth.herokuapp.com/api/auth/registration', { ...form, status: 1 }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    setIsLoading(false)
                    if (!res?.data?.success && !res?.data?.token) {
                        enqueueSnackbar(res?.data?.message, {
                            variant: 'error'
                        })
                    }
                    if (res?.data?.success && res?.data?.token) {
                        localStorage.setItem('token', JSON.stringify(res.data.token))
                        navigate('/')
                    }
                })
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
            setForm({
                username: '',
                email: '',
                password: '',
            })
        } else if (!validateEmail(form.email)) {
            enqueueSnackbar('Please correctly fill an email field', {
                variant: 'error'
            })
        } else {
            enqueueSnackbar('Fill in all the fields', {
                variant: 'error'
            })
        }
    }


    return (
        <div className="authForm d-flex flex-column align-items-center">
            <h3 className='authTitle mb-3'>Sign up</h3>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <TextInput onChangeFunction={changeHandler} defaultValue={form.username} />
                <EmailInput onChangeFunction={changeHandler} defaultValue={form.email} />
                <PasswordInput onChangeFunction={changeHandler} defaultValue={form.password} />
                <AuthButton isLoading={isLoading} text="Sign up" onClickFunction={registerHandler} />
            </form>
            <p className='text-white'>Already have an account? <Link to="/signIn">Sign in</Link></p>
        </div>
    )
}

export default SignUpForm