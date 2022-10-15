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
  const { deleteCookie, cookieHandler } = useAuth()
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
      <Header enableHeaderButtons={false} />

      <ChangePasswordDialog
        open={isPasswordDialogActive}
        handleClose={handlePasswordDialogClose}
      />
      <DeleteUserDialog
        open={isDeleteDialogActive}
        handleClose={handleDeleteDialogClose}
      />
      <Grid sx={{ padding: '15px', alignItems: 'center' }}>
        <Card sx={{ maxWidth: 345, paddingTop: '5px', paddingBottom: '5px' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Account Information
            </Typography>

            <Typography variant="h6">Username</Typography>

            <Typography variant="body2" color="text.secondary">
              UserName
            </Typography>
            <Divider variant="fullWidth" />

            <Typography variant="h6">Password</Typography>

            <Button onClick={handlePasswordDialogClickOpen} size="small">
              Change Password
            </Button>
            <Divider variant="fullWidth" />
          </CardContent>
        </Card>
      </Grid>
      <Grid sx={{ padding: '15px' }}>
        <Card sx={{ maxWidth: 345, paddingTop: '5px', paddingBottom: '5px' }}>
          <CardContent>
            <Button
              onClick={handleDeleteDialogClickOpen}
              sx={{ color: '#ff0000' }}
              size="small"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default SettingsPage
