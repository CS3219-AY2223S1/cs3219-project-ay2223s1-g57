import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { URL_LOG_OUT } from '../constants/api'
import { LOG_IN, SETTINGS, HOME } from '../constants/directory'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'

type HeaderProps = {
  enableUserButton: boolean
}
const Header = ({ enableUserButton }: HeaderProps) => {
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
          <IconButton
            component={Link}
            to={HOME}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, flexGrow: 1 }}
          >
            PeerPrep
          </IconButton>
          {enableUserButton && (
            <Button color="inherit" component={Link} to={SETTINGS}>
              User
            </Button>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
