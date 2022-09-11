import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type ChangePasswordDialogProps = {
  open: boolean
  handleClose: () => void
}
export default function ChangePasswordDialog({
  handleClose,
  open,
}: ChangePasswordDialogProps) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')
  const onSubmit = () => {
    console.log(oldPassword)
    console.log(newPassword)
    console.log(newPasswordAgain)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
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
            onClick={onSubmit}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
