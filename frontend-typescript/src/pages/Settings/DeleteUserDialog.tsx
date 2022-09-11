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
  Typography,
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
  const [validationText, setValidationText] = useState('')
  const username = 'peerprepUser'

  // const handleChangePassword = async () => {
  //   const res = await axios
  //     .post(URL_CHANGE_PASSWORD, { oldPassword, newPassword }, authHeader)
  //     .catch((err: { response: { status: any } }) => {
  //       if (err.response.status === STATUS_UNAUTHORIZED) {
  //         deleteCookie()
  //       } else if (err.response.status === STATUS_BAD_REQUEST) {
  //         setOldPasswordError(true)
  //       }
  //     })
  //   if (res && res.status === STATUS_CODE_SUCCESS) {
  //     setOldPasswordError(false)
  //     handleClose()
  //   }
  // }

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ color: '#ff0000' }}>
            Are you absolutely sure?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Once you delete your account, there is no going back. Please be
              certain. <br />
              <br /> Please type
              <span style={{ color: 'red' }}> {username} </span>to confirm
            </DialogContentText>

            <TextField
              onChange={(event) => setValidationText(event.target.value)}
              autoFocus
              margin="dense"
              id="newPasswordAgain"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              disabled={validationText !== username}
              // onClick={handleChangePassword}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
