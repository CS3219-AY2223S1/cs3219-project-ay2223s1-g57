import React from 'react'

import { Grid, Typography } from '@mui/material'
const PeerPrepLogoSmall = () => {
  return (
    <Grid
      spacing={0}
      direction="row"
      justifyContent="center"
      alignItems="center"
      container
    >
      <Grid item>
        <svg
          width="46"
          height="32"
          viewBox="0 0 46 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="17.1777"
            height="3.9456"
            rx="1.9728"
            transform="matrix(0.639799 -0.768542 0.861665 0.507477 0.0264893 19.5436)"
            fill="#E56E52"
          />
          <rect
            x="16.0055"
            y="19.7818"
            width="9.06166"
            height="3.49091"
            rx="1.74545"
            fill="#2F2F5A"
          />
          <rect
            width="16.5015"
            height="4.07874"
            rx="2.03937"
            transform="matrix(0.39714 -0.917758 0.956196 0.292728 20.3633 22.4172)"
            fill="#E56E52"
          />
          <rect
            width="17.1777"
            height="3.9456"
            rx="1.9728"
            transform="matrix(0.639799 0.768542 -0.861665 0.507477 3.39978 16.8146)"
            fill="#E56E52"
          />
          <rect
            width="17.1777"
            height="3.9456"
            rx="1.9728"
            transform="matrix(0.639799 -0.768542 0.861665 0.507477 31.6385 30.0163)"
            fill="#E56E52"
          />
          <rect
            width="17.1777"
            height="3.9456"
            rx="1.9728"
            transform="matrix(0.639799 0.768542 -0.861665 0.507477 35.0383 6.3418)"
            fill="#E56E52"
          />
          <ellipse
            cx="34.2671"
            cy="2.90909"
            rx="3.45865"
            ry="2.90909"
            fill="#2F2F5A"
          />
          <ellipse
            cx="12.5468"
            cy="2.90909"
            rx="3.45865"
            ry="2.90909"
            fill="#2F2F5A"
          />
        </svg>
      </Grid>
      <Grid item>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#2F2F5A',
            paddingLeft: '10px',
          }}
        >
          Peerprep
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PeerPrepLogoSmall
