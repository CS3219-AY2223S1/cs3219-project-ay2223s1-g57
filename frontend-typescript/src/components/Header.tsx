import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <div>
      <AppBar
        sx={{
          background: 'none',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Typography
            variant={'h1'}
            sx={{
              color: '#000000',
              fontSize: '1.5rem',
            }}
          >
            Peerprep
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
