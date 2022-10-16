import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
type DifficultyCardProps = {
  difficulty: string
  starCount: number
}

const DifficultyCard = ({ difficulty, starCount }: DifficultyCardProps) => {
  return (
    <Card
      sx={{
        marginX: '1rem',
        boxShadow: '4',
        borderWidth: '1',
        borderColor: 'gray.800',
      }}
    >
      <CardActionArea sx={{ paddingTop: '5px', paddingBottom: '5px' }}>
        <CardContent>
          <Grid
            container
            sx={{
              direction: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 250,
            }}
          >
            <Grid item>
              <Typography
                sx={{ paddingBottom: '10px', color: '#2F2F5A' }}
                variant="body1"
              >
                {difficulty}
              </Typography>
            </Grid>
            <Box width="100%" />
            <Grid item>
              <ArrowBackIosIcon sx={{ color: '#E56E52' }} fontSize="large" />
              {[...Array(starCount)].map((num, idx) => (
                <StarIcon
                  key={idx}
                  sx={{ color: '#E56E52' }}
                  fontSize="large"
                />
              ))}
              <ArrowForwardIosIcon sx={{ color: '#E56E52' }} fontSize="large" />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DifficultyCard
