import React, { useEffect, useState } from 'react'

import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
} from '@mui/material'

import Header from '../../components/Header'
import ChangePasswordDialog from './ChangePasswordDialog'
import DeleteUserDialog from './DeleteUserDialog'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const SettingsPage = () => {
  const { deleteCookie, cookieHandler, currentUsername } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookieHandler.get('jwt-peerprep')) {
      deleteCookie()
      navigate('/')
    }
  }, [cookieHandler.get('jwt-peerprep')])

  const [isPasswordDialogActive, setIsPasswordDialogActive] = useState(false)
  const [isDeleteDialogActive, setIsDeleteDialogActive] = useState(false)

  const handlePasswordDialogClickOpen = () => {
    setIsPasswordDialogActive(true)
  }

  const handleDeleteDialogClickOpen = () => {
    setIsDeleteDialogActive(true)
  }

  const handlePasswordDialogClose = () => {
    setIsPasswordDialogActive(false)
  }
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogActive(false)
  }
  return (
    <>
      <Header enableHeaderButtons={true} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minWidth: '100vh', minHeight: '60vh' }}
      >
        {' '}
        <ChangePasswordDialog
          open={isPasswordDialogActive}
          handleClose={handlePasswordDialogClose}
        />
        <DeleteUserDialog
          open={isDeleteDialogActive}
          handleClose={handleDeleteDialogClose}
        />
        <Grid sx={{ padding: '15px', alignItems: 'center' }}>
          <Card sx={{ minWidth: 345, paddingTop: '5px', paddingBottom: '5px' }}>
            <CardContent>
              <Typography
                sx={{ paddingLeft: '10px', color: '#2F2F5A' }}
                gutterBottom
                variant="h6"
                component="div"
              >
                Account Information
              </Typography>

              <Typography
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '10px',
                  color: '#2F2F5A',
                }}
                variant="body1"
              >
                Username
              </Typography>

              <Typography
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '10px',
                  paddingBottom: '10px',
                }}
                variant="body2"
                color="text.secondary"
              >
                {currentUsername}{' '}
              </Typography>
              <Divider variant="fullWidth" />

              <Typography
                sx={{
                  color: '#2F2F5A',
                  paddingTop: '10px',
                  paddingLeft: '10px',
                  paddingBottom: '10px',
                }}
                variant="body1"
              >
                Password
              </Typography>

              <Button
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '10px',
                  paddingBottom: '10px',
                }}
                onClick={handlePasswordDialogClickOpen}
                size="small"
              >
                Change Password
              </Button>
              <Divider variant="fullWidth" />
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ padding: '5px' }}>
          <Card sx={{ minWidth: 345, paddingTop: '2px', paddingBottom: '2px' }}>
            <CardContent>
              <Button
                onClick={handleDeleteDialogClickOpen}
                sx={{ paddingLeft: '10px', color: '#ff0000' }}
                size="small"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default SettingsPage
