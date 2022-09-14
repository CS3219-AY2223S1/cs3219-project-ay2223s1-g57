import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

import { useAuth } from '../../context/AuthContext'
import { LOG_IN } from '../../constants/directory'

import { URL_DELETE_USER } from '../../constants/api'
import {
  // STATUS_CODE_SUCCESSFULLY_UPDATED
  STATUS_UNAUTHORIZED,
  STATUS_CODE_SUCCESSFULLY_UPDATED,
} from '../../constants/statusCodes'

type ChangePasswordDialogProps = {
  open: boolean
  handleClose: () => void
}
export default function ChangePasswordDialog({
  handleClose,
  open,
}: ChangePasswordDialogProps) {
  const navigate = useNavigate()
  const { deleteCookie, authHeader } = useAuth()
  const [validationText, setValidationText] = useState('')
  const username = 'peerprepUser'

  const handleDelete = async () => {
    const res = await axios
      .delete(URL_DELETE_USER, authHeader)
      .catch((err: { response: { status: any } }) => {
        if (err.response.status === STATUS_UNAUTHORIZED) {
          deleteCookie()
        }
        // else if (err.response.status === STATUS_BAD_REQUEST) {
        // maybe we can put a toast here
        // }
      })
    if (res && res.status === STATUS_CODE_SUCCESSFULLY_UPDATED) {
      deleteCookie()
      handleClose()
      navigate(LOG_IN)
    }
  }

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
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
