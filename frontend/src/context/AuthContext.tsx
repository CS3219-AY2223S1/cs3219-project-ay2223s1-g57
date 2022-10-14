import React, { Context, createContext, useContext, useState } from 'react'
import Cookies from 'universal-cookie'
import { JWT_PEERPREP, CURRENT_USERNAME } from '../constants/auth'

interface AuthContext {
  authHeader: { [headers: string]: { [Authorization: string]: string } }
  currentCookie: string | undefined
  currentUsername: string | undefined
  setCookieState: (accessToken: string) => void
  setCurrentUsername: (username: string) => void
  deleteCookie: () => void
}

const CurrentAuthContext: Context<AuthContext> = createContext(
  {} as AuthContext,
)

export const useAuth = () => useContext(CurrentAuthContext)

type Props = {
  children?: React.ReactNode
}
export const AuthContext: React.FC<Props> = ({ children }) => {
  const cookieHandler = new Cookies()

  const [currentCookie, setCookie] = useState(cookieHandler.get(JWT_PEERPREP))
  const [currentUsername, setUsername] = useState(
    cookieHandler.get(CURRENT_USERNAME),
  )

  const setCookieState = (accessToken: string) => {
    setCookie(accessToken)
    cookieHandler.set(JWT_PEERPREP, accessToken, { path: '/' })
  }
  const deleteCookie = () => {
    cookieHandler.remove(JWT_PEERPREP)
    cookieHandler.remove(CURRENT_USERNAME)
    setCookie(undefined)
    setUsername(undefined)
  }

  const setCurrentUsername = (username: string) => {
    cookieHandler.set(CURRENT_USERNAME, username)
    setUsername(username)
  }

  const authHeader = {
    headers: { Authorization: `Bearer ${currentCookie}` },
  }
  return (
    <CurrentAuthContext.Provider
      value={{
        deleteCookie,
        currentCookie,
        setCookieState,
        authHeader,
        currentUsername,
        setCurrentUsername,
      }}
    >
      {children}
    </CurrentAuthContext.Provider>
  )
}
