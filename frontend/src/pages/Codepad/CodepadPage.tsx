import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Typography,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemText,
} from '@mui/material'

import { useSocket } from '../../context/SocketContext'
import Header from '../../components/Header'
import { DifficultyType } from '../../enums/Difficulty'
import { HOME } from '../../constants/directory'
import {
  disconnectSocket,
  addSocketEventsListeners,
  SocketEvents,
} from '../../components/Socket/Socket'
import { useBackListener } from '../../utils/Navigation'

const DialogMessage = Object.freeze({
  MATCHLEFT: 'Uhoh! Your match left!',
  DISCONNECT: 'Uhoh! You got disconnected!',
})

interface LocationState {
  roomId: string
  difficulty: DifficultyType
}

const CodepadPage = () => {
  const navigate = useNavigate()
  const { socket, setSocket } = useSocket()
  const { roomId, difficulty } = useLocation().state as LocationState
  const [dialogMsg, setDialogMsg] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    // for refresh
    if (!socket) {
      setDialogMsg(DialogMessage.DISCONNECT)
      setDialogOpen(true)
      return
    }

    addSocketEventsListeners(socket, [
      {
        socketEvent: SocketEvents.MATCH_LOST,
        listener: () => {
          setDialogMsg(DialogMessage.MATCHLEFT)
          setDialogOpen(true)
        },
      },
    ])
  }, [socket])

  // for refresh or match left
  const handleHomeButton = () => {
    if (socket) {
      disconnectSocket(socket, setSocket)
    }

    // replace so that we cannot navigate back here
    navigate(HOME, { replace: true })
  }

  useBackListener(() => {
    disconnectSocket(socket, setSocket)

    // replace so that we cannot navigate back here
    navigate(HOME, { replace: true })
  })

  return (
    <div>
      <Header
        enableHeaderButtons={false}
        handleLeaveRoom={() => disconnectSocket(socket, setSocket)}
      />
      <Typography>Codepad Page</Typography>
      <Typography>Room ID: {roomId}</Typography>
      <Typography>Difficulty: {difficulty}</Typography>
      <Dialog open={dialogOpen}>
        <DialogTitle>{dialogMsg}</DialogTitle>
        <ListItem button onClick={handleHomeButton}>
          <ListItemText primary={'Home'} />
        </ListItem>
      </Dialog>
    </div>
  )
}

export default CodepadPage
