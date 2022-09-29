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

interface LocationState {
  roomId: string
  difficulty: DifficultyType
}

const CodepadPage = () => {
  const navigate = useNavigate()
  const { socket, setSocket } = useSocket()
  const { roomId, difficulty } = useLocation().state as LocationState
  const [matchLeftDialogueOpen, setMatchLeftDialogueOpen] = useState(false)
  const [disconnectDialogueOpen, setDisconnectDialogueOpen] = useState(false)

  useEffect(() => {
    if (!socket) {
      setDisconnectDialogueOpen(true)
      return
    }

    addSocketEventsListeners(socket, [
      {
        socketEvent: SocketEvents.MATCH_LOST,
        listener: () => setMatchLeftDialogueOpen(true),
      },
    ])
  }, [socket])

  const handleHomeButton = () => {
    disconnectSocket(socket, setSocket)
    setDisconnectDialogueOpen(true)
  }

  useBackListener(() => {
    disconnectSocket(socket, setSocket)
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
      <Dialog open={matchLeftDialogueOpen}>
        <DialogTitle>Uhoh! Your match left!</DialogTitle>
        <ListItem button onClick={handleHomeButton}>
          <ListItemText primary={'Home'} />
        </ListItem>
      </Dialog>
      <Dialog open={disconnectDialogueOpen}>
        <DialogTitle>Uhoh! You left!</DialogTitle>
        <ListItem button onClick={() => navigate(HOME)}>
          <ListItemText primary={'Home'} />
        </ListItem>
      </Dialog>
    </div>
  )
}

export default CodepadPage
