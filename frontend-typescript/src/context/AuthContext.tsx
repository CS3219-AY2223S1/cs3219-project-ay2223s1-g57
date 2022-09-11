import React, { Context, createContext, useContext, useState } from 'react'
import Cookies from 'universal-cookie'
import { JWT_PEERPREP } from '../constants/auth'

interface AuthContext {
  cookieHandler: Cookies
  currentCookie: string | undefined
  setCookieState: (accessToken: string) => void
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
  return (
    <CurrentAuthContext.Provider
      value={{ cookieHandler, currentCookie, setCookieState }}
    >
      {children}
    </CurrentAuthContext.Provider>
  )
}
