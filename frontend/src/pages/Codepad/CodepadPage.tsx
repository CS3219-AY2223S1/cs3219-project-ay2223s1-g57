import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
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
import { FirepadComponent } from './FirepadComponent'
import { URL_GET_QN } from '../../constants/api'
import Question, { QuestionInfo } from './Question'
import ChatBox from './ChatBox'
import { useAuth } from '../../context/AuthContext'

const DialogMessage = Object.freeze({
  MATCHLEFT: 'Uhoh! Your match left!',
  DISCONNECT: 'Uhoh! You got disconnected!',
  LEAVEROOM: 'Are you sure you want to leave?',
})

interface LocationState {
  roomId: string
  difficulty: DifficultyType
}

const verifyState = (obj: unknown): obj is LocationState => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'roomId' in obj &&
    'difficulty' in obj
  )
}

const CodepadPage = () => {
  const { authHeader } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Ensure that we enter codepad page via a valid navigation flow
  if (!location.state || !verifyState(location.state)) {
    return <Navigate to={HOME} />
  }
  const { roomId, difficulty } = useLocation().state as LocationState

  const { socket, setSocket } = useSocket()
  const [dialogMsg, setDialogMsg] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [question, setQuestion] = useState<QuestionInfo>({} as QuestionInfo)

  useEffect(() => {
    axios
      .get(`${URL_GET_QN}/${difficulty}/${roomId}`, authHeader)
      .then((res: any) => {
        setQuestion(res.data.data)
      })
      .catch((err: { response: { status: any } }) => {
        console.log(err.response.status)
      })
  }, [])

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

  // home button
  const handleLeaveRoom = () => {
    setDialogMsg(DialogMessage.LEAVEROOM)
    setDialogOpen(true)
  }

  return (
    <div>
      <Header
        enableLeaveRoom={false}
        enableHeaderButtons={false}
        handleLeaveRoom={() => disconnectSocket(socket, setSocket)}
      />
      <Grid container direction="row" justifyContent="flex-end">
        <Grid item>
          <Button onClick={handleLeaveRoom}>Leave Session</Button>
        </Grid>
      </Grid>

      <Question question={question} />
      <FirepadComponent roomId={roomId} />
      <ChatBox roomId={roomId} />
      <Dialog open={dialogOpen}>
        <DialogTitle>{dialogMsg}</DialogTitle>
        {dialogMsg === DialogMessage.LEAVEROOM && (
          <ListItem button onClick={() => setDialogOpen(false)}>
            <ListItemText primary={'Cancel'} />
          </ListItem>
        )}
        <ListItem button onClick={handleHomeButton}>
          <ListItemText primary={'Home'} />
        </ListItem>
      </Dialog>
    </div>
  )
}

export default CodepadPage
