import React from 'react'

import { Grid, Typography } from '@mui/material'
const PeerPrepLogo = () => {
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
          width="74"
          height="56"
          viewBox="0 0 74 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="29.0918"
            height="6.49543"
            rx="3.24772"
            transform="matrix(0.60773 -0.794144 0.842011 0.539461 0.0426331 34.2013)"
            fill="#E56E52"
          />
          <rect
            x="25.7479"
            y="34.6182"
            width="14.5774"
            height="6.10909"
            rx="3.05454"
            fill="#2F2F5A"
          />
          <rect
            width="28.5226"
            height="6.61281"
            rx="3.30641"
            transform="matrix(0.369617 -0.929184 0.94877 0.315967 32.7584 39.23)"
            fill="#E56E52"
          />
          <rect
            width="29.0918"
            height="6.49543"
            rx="3.24772"
            transform="matrix(0.60773 0.794144 -0.842011 0.539461 5.46924 29.4254)"
            fill="#E56E52"
          />
          <rect
            width="29.0918"
            height="6.49543"
            rx="3.24772"
            transform="matrix(0.60773 -0.794144 0.842011 0.539461 50.8968 52.5286)"
            fill="#E56E52"
          />
          <rect
            width="29.0918"
            height="6.49543"
            rx="3.24772"
            transform="matrix(0.60773 0.794144 -0.842011 0.539461 56.366 11.0981)"
            fill="#E56E52"
          />
          <ellipse
            cx="55.1253"
            cy="5.09091"
            rx="5.56391"
            ry="5.09091"
            fill="#2F2F5A"
          />
          <ellipse
            cx="20.184"
            cy="5.09091"
            rx="5.56391"
            ry="5.09091"
            fill="#2F2F5A"
          />
        </svg>
      </Grid>
      <Grid item>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontSize: '48px',
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

export default PeerPrepLogo
