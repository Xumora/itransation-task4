import axios from 'axios'
import { useEffect, useCallback } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'
import AuthPage from './pages/AuthPage/AuthPage'
import SignInForm from './pages/AuthPage/components/SignInForm/SignInForm'
import SignUpForm from './pages/AuthPage/components/SignUpForm/SignUpForm'
import MainPage from './pages/MainPage/MainPage'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

function App() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const tokenValidation = useCallback(async () => {
    if (token) {
      try {
        await axios.get('https://taskfourauth.herokuapp.com/api/auth/tokenValidation', {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token)}`
          }
        })
          .then(res => {
            if (!res?.data?.success) {
              localStorage.removeItem('token')
              navigate('/')
            }
          })
      } catch (error) {
        console.log(error);
      }
    }
  }, [token, navigate])

  useEffect(() => {
    tokenValidation()
  }, [token, tokenValidation])

  useEffect(() => {
    if (!token && window.location.pathname !== '/signIn/registration') {
      navigate('/signIn')
    }
    if (token) {
      navigate('/')
    }
  }, [token, navigate,])

  let routes = useRoutes([
    {
      path: '/',
      element: token && <MainPage />
    },
    {
      path: '/signIn',
      element: <AuthPage />,
      children: [
        {
          path: '',
          element: <SignInForm />
        },
        {
          path: 'registration',
          element: <SignUpForm />
        }
      ]
    }
  ]);

  return routes;
}

export default App;
