import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Box, Button, Container, Typography, Grid } from '@mui/material'
import { LOG_IN } from '../../constants/directory'
import { useAuth } from '../../context/AuthContext'

export default function Error() {
  const { cookieHandler } = useAuth()
  if (cookieHandler.get('jwt-peerprep') === undefined) {
    return <Navigate to={LOG_IN} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" component={Link} to={LOG_IN}>
              Go to Home Page
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
