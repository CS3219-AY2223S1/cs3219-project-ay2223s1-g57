import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as io from 'socket.io-client'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {
  Typography,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

import { useSocket } from '../../context/SocketContext'
import Header from '../../components/Header'
import { DifficultyType } from '../../enums/Difficulty'
import { HOME, CODEPAD } from '../../constants/directory'

const DialogMessage = Object.freeze({
  NOMATCH: 'Uhoh! No match found!',
  NORESPONSE: 'Uhoh! No response from server!',
})

interface LocationState {
  difficulty: DifficultyType
}

const LobbyPage = () => {
  const navigate = useNavigate()
  const { socket, setSocket } = useSocket()
  const { difficulty } = useLocation().state as LocationState
  const [timerReset, setTimerReset] = useState(false)
  const [dialogueOpen, setDialogueOpen] = useState(false)
  const [dialogMsg, setDialogMsg] = useState(DialogMessage.NOMATCH)
  const serverNoResponse = useRef(true)

  // Connect to socket
  useEffect(() => {
    setSocket(io.connect('http://localhost:8001'))
  }, [setSocket])

  useEffect(() => {
    if (socket) {
      // Check connection
      socket.on('connect', () => {
        console.log(socket.id)
      })

      // Emit match event upon connecting
      socket.emit('match', difficulty)

      socket.on('matchSuccess', (data) => {
        console.log('matchSuccess', data.roomId)

        navigate(CODEPAD, {
          state: {
            roomId: data.roomId,
            difficulty: difficulty,
          },
        })
      })

      socket.on('matchFail', (data) => {
        console.log('matchFail', data.roomId)

        setDialogueOpen(true)
        serverNoResponse.current = false
      })
    }
  }, [socket, navigate, difficulty])

  const handleLeaveRoom = () => {
    socket!.disconnect()
    setSocket(null)
  }

  const handleTryAgain = () => {
    socket!.emit('match', difficulty)

    setDialogueOpen(false)

    setTimerReset(!timerReset)
  }

  const handleGoBack = () => {
    socket!.disconnect()
    setSocket(null)

    navigate(HOME)
  }

  return (
    <div>
      <Header enableHeaderButtons={false} handleLeaveRoom={handleLeaveRoom} />

      <Typography>Matching... </Typography>

      <div>
        <CountdownCircleTimer
          isPlaying
          key={timerReset as unknown as React.Key}
          duration={30}
          colors={'#000000'}
          onComplete={() => {
            setTimeout(() => {
              // Give 5sec lag time for server to respond
              if (serverNoResponse.current) {
                setDialogMsg(DialogMessage.NORESPONSE)
                setDialogueOpen(true)
              }
            }, 5000)
          }}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>

      <Dialog open={dialogueOpen}>
        <DialogTitle>{dialogMsg}</DialogTitle>
        <List>
          <ListItem button onClick={handleTryAgain}>
            <ListItemText primary={'Try again'} />
          </ListItem>

          <ListItem button onClick={handleGoBack}>
            <ListItemText primary={'Go back'} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
}

export default LobbyPage
