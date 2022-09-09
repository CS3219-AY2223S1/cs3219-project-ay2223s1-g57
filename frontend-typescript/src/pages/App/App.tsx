import React from 'react'
import { Box } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from '../LogIn/LoginPage'
import SignupPage from '../SignUp/SignUpPage'
import HomePage from '../Home/HomePage'

const App: React.FC = () => {
  return (
    <div className="App">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '4rem',
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/session" element={<SessionPage />} /> */}
        </Routes>
      </Box>
    </div>
  )
}

export default App
