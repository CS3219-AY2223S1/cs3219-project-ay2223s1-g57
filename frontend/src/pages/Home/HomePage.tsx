import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Grid } from '@mui/material'

import Header from '../../components/Header'
import { Difficulty } from '../../enums/Difficulty'
import { useAuth } from '../../context/AuthContext'
import DifficultyCard from '../../components/DifficultyCard'

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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        // justifyContent="center"
        style={{ paddingTop: '40px', minWidth: '100vh', minHeight: '60vh' }}
      >
        <Typography
          sx={{
            color: '#2F2F5A',
            fontWeight: 'bold',
          }}
          gutterBottom
          variant="h5"
        >
          Choose your difficulty level
        </Typography>
        <Grid
          sx={{ paddingTop: '40px', justifyContent: 'space-around' }}
          container
          spacing={0}
          direction="row"
        >
          {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map(
            (difficulty, idx) => (
              <Link
                style={{ textDecoration: 'none' }}
                key={difficulty}
                to="/lobby"
                state={{
                  difficulty: difficulty,
                }}
              >
                <DifficultyCard
                  difficulty={difficulty}
                  starCount={idx + 1}
                ></DifficultyCard>
              </Link>
            ),
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage
