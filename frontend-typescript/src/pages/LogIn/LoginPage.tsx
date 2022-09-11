import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { SetStateAction, useState } from 'react'
import axios from 'axios'
import { URL_LOG_IN } from '../../constants/api'
import {
  STATUS_CODE_SUCCESS,
  STATUS_UNAUTHORIZED,
} from '../../constants/statusCodes'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LoginPage = () => {
  const { setCookieState } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)

  const handleLogin = async () => {
    setIsLoginSuccess(false)
    const res = await axios
      .post(URL_LOG_IN, { username, password })
      .catch((err: { response: { status: any } }) => {
        if (err.response.status === STATUS_UNAUTHORIZED) {
          setErrorDialog('Invalid username or password')
        } else {
          setErrorDialog('Please try again later')
        }
      })
    if (res && res.status === STATUS_CODE_SUCCESS) {
      setCookieState(res.data.accessToken)
      setSuccessDialog('Login success!')
      setIsLoginSuccess(true)
    }
  }

  const closeDialog = () => setIsDialogOpen(false)

  const setSuccessDialog = (msg: SetStateAction<string>) => {
    setIsDialogOpen(true)
    setDialogTitle('Success')
    setDialogMsg(msg)
  }

  const setErrorDialog = (msg: SetStateAction<string>) => {
    setIsDialogOpen(true)
    setDialogTitle('Error')
    setDialogMsg(msg)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
      }}
    >
      <Typography variant={'h3'} marginBottom={'2rem'}>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: '1rem' }}
        autoFocus
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: '2rem' }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant={'outlined'} onClick={handleLogin}>
          Log In
        </Button>

        <Button variant={'outlined'} component={Link} to="/signup">
          Sign Up
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {isLoginSuccess ? (
            <Button component={Link} to="/home">
              Log in
            </Button>
          ) : (
            <Button onClick={closeDialog}>Done</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default LoginPage
