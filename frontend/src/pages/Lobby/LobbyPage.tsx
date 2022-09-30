import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Update } from 'history'
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
import {
  initSocket,
  disconnectSocket,
  addSocketEventsListeners,
  removeAllSocketEventsListeners,
  SocketEvents,
  findMatch,
  SocketData,
} from '../../components/Socket/Socket'
import { useBackListener } from '../../utils/Navigation'

const DialogMessage = Object.freeze({
  NOMATCH: 'Uhoh! No match found!',
  NORESPONSE: 'Uhoh! No response from server!',
})

interface LocationState {
  difficulty: DifficultyType
}

const verifyState = (obj: unknown): obj is LocationState => {
  return typeof obj === 'object' && obj !== null && 'difficulty' in obj
}

const LobbyPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Ensure that we enter lobby page via a valid navigation flow
  if (!location.state || !verifyState(location.state)) {
    return <Navigate to={HOME} />
  }
  const { difficulty } = location.state as LocationState

  const [timerReset, setTimerReset] = useState(false)
  const [dialogueOpen, setDialogueOpen] = useState(false)
  const [dialogMsg, setDialogMsg] = useState(DialogMessage.NOMATCH)
  const serverNoResponse = useRef(true)

  //////////////////////////
  // SOCKET FUNCTIONS
  //////////////////////////

  const { socket, setSocket } = useSocket()

  const handleMatchFound = (data: SocketData): void => {
    console.log(SocketEvents.FOUND_MATCH, data!.roomId)

    removeAllSocketEventsListeners(socket)
    navigate(CODEPAD, {
      state: {
        roomId: data!.roomId,
        difficulty: difficulty,
      },
    })
  }

  const handleNoMatch = (data: SocketData): void => {
    console.log(SocketEvents.NO_MATCH, data!.roomId)

    setDialogueOpen(true)
    serverNoResponse.current = false
  }

  // Connect to socket
  useEffect(() => {
    initSocket(setSocket)
  }, [setSocket])

  useEffect(() => {
    if (socket) {
      findMatch(socket, difficulty)

      addSocketEventsListeners(socket, [
        {
          socketEvent: SocketEvents.CONNECT,
          listener: () => console.log(socket!.id),
        },
        {
          socketEvent: SocketEvents.FOUND_MATCH,
          listener: handleMatchFound,
        },
        {
          socketEvent: SocketEvents.NO_MATCH,
          listener: handleNoMatch,
        },
      ])
    }
  }, [socket, navigate, difficulty])

  // Disconnect socket on back
  useBackListener(() => {
    disconnectSocket(socket, setSocket)
    navigate(HOME, { replace: true })
  })

  //////////////////////////

  const handleTryAgain = () => {
    findMatch(socket, difficulty)
    setDialogueOpen(false)
    setTimerReset(!timerReset)
  }

  const handleGoBack = () => {
    disconnectSocket(socket, setSocket)
    navigate(HOME)
  }

  return (
    <div>
      <Header
        enableHeaderButtons={false}
        handleLeaveRoom={() => disconnectSocket(socket, setSocket)}
      />

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
