import React, { useState } from 'react'
import axios from 'axios'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import Header from '../../components/Header'
import { useAuth } from '../../context/AuthContext'
import { URL_CHANGE_PASSWORD } from '../../constants/api'
import {
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_CODE_SUCCESS,
} from '../../constants/statusCodes'

type ChangePasswordDialogProps = {
  open: boolean
  handleClose: () => void
}
export default function ChangePasswordDialog({
  handleClose,
  open,
}: ChangePasswordDialogProps) {
  const { deleteCookie, authHeader } = useAuth()
  const [oldPasswordError, setOldPasswordError] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')

  const handleChangePassword = async () => {
    setOldPasswordError(false)
    const res = await axios
      .post(URL_CHANGE_PASSWORD, { oldPassword, newPassword }, authHeader)
      .catch((err: { response: { status: any } }) => {
        if (err.response.status === STATUS_UNAUTHORIZED) {
          deleteCookie()
        } else if (err.response.status === STATUS_BAD_REQUEST) {
          setOldPasswordError(true)
        }
      })
    if (res && res.status === STATUS_CODE_SUCCESS) {
      setOldPasswordError(false)
      handleClose()
    }
  }

  return (
    <>
      <Header enableUserButton={false} />
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              error={oldPasswordError}
              onChange={(event) => setOldPassword(event.target.value)}
              autoFocus
              margin="dense"
              id="currentPassword"
              label="Current Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <TextField
              error={newPassword !== newPasswordAgain}
              onChange={(event) => setNewPassword(event.target.value)}
              autoFocus
              margin="dense"
              id="newPassword"
              label="New Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <TextField
              error={newPassword !== newPasswordAgain}
              onChange={(event) => setNewPasswordAgain(event.target.value)}
              autoFocus
              margin="dense"
              id="newPasswordAgain"
              label="New Password (again)"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              disabled={newPassword !== newPasswordAgain}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
