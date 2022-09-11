import React, { Context, createContext, useContext, useState } from 'react'
import Cookies from 'universal-cookie'
import { JWT_PEERPREP } from '../constants/auth'

interface AuthContext {
  authHeader: { [headers: string]: { [Authorization: string]: string } }
  currentCookie: string | undefined
  setCookieState: (accessToken: string) => void
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
  const setCookieState = (accessToken: string) => {
    setCookie(accessToken)
    cookieHandler.set(JWT_PEERPREP, accessToken, { path: '/' })
  }
  const deleteCookie = () => {
    cookieHandler.remove(JWT_PEERPREP)
    setCookie(undefined)
  }

  const authHeader = {
    headers: { Authorization: `Bearer ${currentCookie}` },
  }
  return (
    <CurrentAuthContext.Provider
      value={{ deleteCookie, currentCookie, setCookieState, authHeader }}
    >
      {children}
    </CurrentAuthContext.Provider>
  )
}
