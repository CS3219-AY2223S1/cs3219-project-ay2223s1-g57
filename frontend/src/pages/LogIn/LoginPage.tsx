import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
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
import CssTextField from '../../components/CssTextField'
import PeerPrepLogo from '../../components/PeerPrepLogo'

const styles = {
  textField: {
    width: '455px',
    backgroundColor: 'white',
  },
  button: {
    width: '455px',
    backgroundColor: '#E56E52',
    '&:hover': {
      backgroundColor: '#2F2F5A',
    },
  },
}

const LoginPage = () => {
  const { setCookieState, setCurrentUsername } = useAuth()
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
      setCurrentUsername(username)
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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minWidth: '100vh', minHeight: '60vh' }}
    >
      <PeerPrepLogo />
      <Grid item sx={{ paddingTop: '50px' }}>
        <CssTextField
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          label="Username"
          id="custom-css-outlined-input"
          sx={styles.textField}
        />
      </Grid>
      <Grid item sx={{ paddingTop: '10px' }}>
        <CssTextField
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          type="password"
          label="Password"
          id="custom-css-outlined-input"
          sx={styles.textField}
        />
      </Grid>

      <Grid item sx={{ paddingTop: '30px' }}>
        <Button sx={styles.button} variant={'contained'} onClick={handleLogin}>
          Log In
        </Button>
      </Grid>

      <Grid item sx={{ paddingTop: '15px' }}>
        <Divider>
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontSize: '15px',
              color: '#ABAAAA',
              fontWeight: 'regular',
            }}
          >
            OR
          </Typography>
        </Divider>
      </Grid>

      <Grid item sx={{ paddingTop: '15px' }}>
        <Button
          sx={styles.button}
          variant={'contained'}
          component={Link}
          to="/signup"
        >
          Sign Up
        </Button>
      </Grid>

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
    </Grid>
  )
}

export default LoginPage
