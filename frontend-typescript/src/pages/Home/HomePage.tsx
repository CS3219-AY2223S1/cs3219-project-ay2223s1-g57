import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@mui/material'

import Header from '../../components/Header'

function HomePage() {
  return (
    <div>
      <Header />
      <div>
        <Typography>Choose your difficulty level</Typography>
        {['easy', 'medium', 'hard'].map((difficulty) => (
          <Link
            key={difficulty}
            to="/lobby"
            state={{
              difficulty: difficulty,
            }}
          >
            <Button>
              <Typography variant="h5">{difficulty}</Typography>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage
