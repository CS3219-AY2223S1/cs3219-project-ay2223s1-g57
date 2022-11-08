import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { URL_LOG_OUT } from '../constants/api'
import { LOG_IN, SETTINGS, HOME } from '../constants/directory'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'

import { useAuth } from '../context/AuthContext'
import { ButtonBase, Button, Typography, Grid } from '@mui/material'
import PeerPrepLogoSmall from './PeerPrepLogoSmall'

type HeaderProps = {
  enableLeaveRoom?: boolean
  enableHeaderButtons: boolean
  handleLeaveRoom?: () => void
}

const Header = ({
  enableLeaveRoom = true,
  enableHeaderButtons,
  handleLeaveRoom,
}: HeaderProps) => {
  const navigate = useNavigate()
  const { authHeader, deleteCookie } = useAuth()
  const handleLogout = async () => {
    await axios
      .post(URL_LOG_OUT, {}, authHeader)
      .catch((err: { response: { status: any } }) => {
        console.log(err)
      })

    deleteCookie()
    navigate(LOG_IN)
  }
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justifyContent="space-between"
      sx={{ paddingTop: '10px', minWidth: '100vh', minHeight: '10vh' }}
    >
      <Grid sx={{ paddingLeft: '5px' }} item>
        {enableLeaveRoom ? (
          <ButtonBase component={Link} to={HOME} onClick={handleLeaveRoom}>
            <PeerPrepLogoSmall />
          </ButtonBase>
        ) : (
          <PeerPrepLogoSmall />
        )}
      </Grid>
      {enableHeaderButtons && (
        <Grid sx={{ paddingRight: '5px' }} item>
          <Button color="inherit" component={Link} to={SETTINGS}>
            <PersonIcon sx={{ color: '#2F2F5A' }} />
            <Typography sx={{ color: '#2F2F5A' }}>User</Typography>
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            <LogoutIcon sx={{ color: '#2F2F5A' }} />
            <Typography sx={{ color: '#2F2F5A' }}>Log Out</Typography>
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default Header
