import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

let DEFAULT = { isAuthenticated: false, user: undefined }

export const AuthContext = createContext(DEFAULT)

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState(DEFAULT)
  const navigate = useNavigate()

  const setUser = (token) => {
    if (token) {
      let user = jwtDecode(token)
      if (
        user.email === 'farva74@gmail.com' ||
        user.email === 'matt@movementbymatt.com'
      ) {
        localStorage.setItem('jwt', token)
        setAuth({ isAuthenticated: true, user: user })
        navigate('/vimeo-ott-customers')
      }
    }
  }

  const logOut = () => {
    localStorage.removeItem('jwt')
    setAuth(DEFAULT)
  }

  const logIn = (tokenResponse) => {
    setUser(tokenResponse.credential)
  }

  useEffect(() => {
    let token = localStorage.getItem('jwt')

    if (token && !auth.user) {
      setUser(token)
    }
  }, [auth])

  return (
    <AuthContext.Provider
      value={{ logIn: logIn, logOut: logOut, setUser: setUser, ...auth }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
