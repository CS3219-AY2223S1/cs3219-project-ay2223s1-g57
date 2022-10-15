import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Typography, Button } from '@mui/material'

import Header from '../../components/Header'
import { Difficulty } from '../../enums/Difficulty'
import { useAuth } from '../../context/AuthContext'

const HomePage = () => {
  const { deleteCookie, cookieHandler } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookieHandler.get('jwt-peerprep')) {
      deleteCookie()
      navigate('/')
    }
  }, [cookieHandler.get('jwt-peerprep')])
  return (
    <div>
      <Header enableHeaderButtons={true} />
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
