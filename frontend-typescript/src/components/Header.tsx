import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { URL_LOG_OUT } from '../constants/api'
import { LOG_IN } from '../constants/directory'

import { useAuth } from '../context/AuthContext'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'

const Header = () => {
  const navigate = useNavigate()
  const { authHeader, deleteCookie } = useAuth()
  const handleLogout = async () => {
    await axios.post(URL_LOG_OUT, {}, authHeader)
    deleteCookie()
    navigate(LOG_IN)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Login</Button>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">User</Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
