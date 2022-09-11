import React, { useState } from 'react'
import { Box, SxProps } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'

import { SIGN_UP, LOG_IN, HOME } from '../../constants/directory'
import { useAuth } from '../../context/AuthContext'
import NotFound from './NotFound'
import LoginPage from '../LogIn/LoginPage'
import SignupPage from '../SignUp/SignUpPage'
import HomePage from '../Home/HomePage'

const classProps: { [className: string]: SxProps } = {
  rootDiv: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4rem',
  },
}

const App: React.FC = () => {
  const { currentCookie } = useAuth()

  // cookies.set('jimeeee', 'hello', { path: '/' })
  // const cookies2 = new Cookies()

  // cookies2.set('jimeeee', 'brother', )
  // cookies2.remove('jimeeee')

  // console.log('cookie')

  return (
    <div className="App">
      <Box sx={classProps['rootDiv']}>
        <Routes>
          {currentCookie && (
            <>
              <Route path="/" element={<Navigate to={HOME} />} />
              <Route path={LOG_IN} element={<Navigate to={HOME} />} />
              <Route path={SIGN_UP} element={<Navigate to={HOME} />} />
              <Route path="/home" element={<HomePage />} />
            </>
          )}
          {!currentCookie && (
            <>
              <Route path="/" element={<Navigate to={LOG_IN} />} />
              <Route path={LOG_IN} element={<LoginPage />} />
              <Route path={SIGN_UP} element={<SignupPage />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/session" element={<SessionPage />} /> */}
        </Routes>
      </Box>
    </div>
  )
}

export default App
