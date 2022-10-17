import React, { useState } from 'react'
import { Box, Grid, SxProps } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import {
  SIGN_UP,
  LOG_IN,
  HOME,
  SETTINGS,
  LOBBY,
  CODEPAD,
} from '../../constants/directory'
import { useAuth } from '../../context/AuthContext'
import { SocketProvider } from '../../context/SocketContext'
import NotFound from './NotFound'
import LoginPage from '../LogIn/LoginPage'
import SignupPage from '../SignUp/SignUpPage'
import HomePage from '../Home/HomePage'
import SettingsPage from '../Settings/SettingsPage'
import LobbyPage from '../Lobby/LobbyPage'
import CodepadPage from '../Codepad/CodepadPage'

const classProps: { [className: string]: SxProps } = {
  rootDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
}

const App: React.FC = () => {
  const { cookieHandler } = useAuth()

  return (
    <SocketProvider>
      <Grid className="App">
        <Box sx={classProps['rootDiv']}>
          <Routes>
            <Route path="settings" element={<SettingsPage />} />
            {cookieHandler.get('jwt-peerprep') !== undefined && (
              <>
                <Route path="/" element={<Navigate to={LOG_IN} />} />
                <Route path={LOG_IN} element={<Navigate to={HOME} />} />
                <Route path={SIGN_UP} element={<Navigate to={HOME} />} />
                <Route path={HOME} element={<HomePage />} />
                <Route path={SETTINGS} element={<SettingsPage />} />
                <Route path={LOBBY} element={<LobbyPage />} />
                <Route path={CODEPAD} element={<CodepadPage />} />
              </>
            )}
            {cookieHandler.get('jwt-peerprep') === undefined && (
              <>
                <Route path="/" element={<Navigate to={LOG_IN} />} />
                <Route path={LOG_IN} element={<LoginPage />} />
                <Route path={SIGN_UP} element={<SignupPage />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Grid>
    </SocketProvider>
  )
}

export default App
