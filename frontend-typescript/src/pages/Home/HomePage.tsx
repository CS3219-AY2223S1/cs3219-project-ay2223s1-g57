import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@mui/material'

import Header from '../../components/Header'
import { Difficulty } from '../../enums/Difficulty'

const HomePage = () => {
  return (
    <div>
      <Header enableUserButton={true} />
      <div>
        <Typography>Choose your difficulty level</Typography>
        {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map(
          (difficulty) => (
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
          ),
        )}
      </div>
    </div>
  )
}

export default HomePage
