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
  Grid,
} from '@mui/material'
import { SetStateAction, useState } from 'react'
import axios from 'axios'
import { URL_SIGN_UP } from '../../constants/api'
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
} from '../../constants/statusCodes'
import { Link } from 'react-router-dom'
import PeerPrepLogo from '../../components/PeerPrepLogo'
import CssTextField from '../../components/CssTextField'

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
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9_]+$/
const LENGTH_REGEX = /^(\w{8,20})$/

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [isSignupSuccess, setIsSignupSuccess] = useState(false)
  const [userNameValidation, setUserNameValidation] = useState({
    error: false,
    errorMessage: '',
  })
  const [passwordValidation, setPasswordValidation] = useState({
    error: false,
    errorMessage: '',
  })

  const handleSignup = async () => {
    setIsSignupSuccess(false)
    const res = await axios
      .post(URL_SIGN_UP, { username, password })
      .catch((err: { response: { status: any } }) => {
        if (err.response.status === STATUS_CODE_CONFLICT) {
          setErrorDialog('This username already exists')
        } else {
          setErrorDialog('Please try again later')
        }
      })
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog('Account successfully created')
      setIsSignupSuccess(true)
    }
  }

  const onChangeUsername = (newValue: string) => {
    setUsername(newValue)
    if (!ALPHANUMERIC_REGEX.test(newValue)) {
      setUserNameValidation({
        error: true,
        errorMessage: 'Only alphanumeric characters are allowed',
      })
    } else if (!LENGTH_REGEX.test(newValue)) {
      setUserNameValidation({
        error: true,
        errorMessage: 'Username length should be between 8-20 characters',
      })
    } else {
      setUserNameValidation({
        error: false,
        errorMessage: '',
      })
    }
  }

  const onChangePassword = (newValue: string) => {
    setPassword(newValue)
    if (!ALPHANUMERIC_REGEX.test(newValue)) {
      setPasswordValidation({
        error: true,
        errorMessage: 'Only alphanumeric characters are allowed',
      })
    } else if (!LENGTH_REGEX.test(newValue)) {
      setPasswordValidation({
        error: true,
        errorMessage: 'Password should be between 8-20 characters',
      })
    } else {
      setPasswordValidation({
        error: false,
        errorMessage: '',
      })
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
          error={userNameValidation.error}
          helperText={userNameValidation.errorMessage}
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => onChangeUsername(e.target.value)}
          id="custom-css-outlined-input"
          sx={styles.textField}
          autoFocus
        />
      </Grid>

      <Grid item sx={{ paddingTop: '10px' }}>
        <CssTextField
          error={passwordValidation.error}
          helperText={passwordValidation.errorMessage}
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => onChangePassword(e.target.value)}
          id="custom-css-outlined-input"
          sx={styles.textField}
          autoFocus
        />
      </Grid>

      <Grid item sx={{ paddingTop: '30px' }}>
        <Button
          disabled={
            !ALPHANUMERIC_REGEX.test(username) ||
            !LENGTH_REGEX.test(username) ||
            !ALPHANUMERIC_REGEX.test(password) ||
            !LENGTH_REGEX.test(password)
          }
          sx={styles.button}
          variant={'contained'}
          onClick={handleSignup}
        >
          Sign up
        </Button>
      </Grid>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {isSignupSuccess ? (
            <Button component={Link} to="/login">
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

export default SignupPage
