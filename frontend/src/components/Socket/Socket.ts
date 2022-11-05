import * as io from 'socket.io-client'
import { Socket } from 'socket.io-client'
import { URI_MATCHING_SVC } from '../../constants/api'
import { DifficultyType } from '../../enums/Difficulty'

const checkSocketExist = (socket: Socket | null) => {
  if (!socket) {
    throw new Error('Socket not initialised!')
  }
}

//////////////////////////
// SOCKET CONNECTIONS
//////////////////////////

export const initSocket = (
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>,
): void => {
  setSocket(io.connect(URI_MATCHING_SVC))
}

export const disconnectSocket = (
  socket: Socket | null,
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>,
): void => {
  checkSocketExist(socket)
  socket!.disconnect()
  setSocket(null)
}

//////////////////////////
// SOCKET EVENTS
//////////////////////////

export const SocketEvents = Object.freeze({
  CONNECT: 'connect',
  FOUND_MATCH: 'matchSuccess',
  NO_MATCH: 'matchFail',
  MATCH_LOST: 'matchLost',
  MATCH_ALREADY: 'matchAlready',
})

export type SocketData = {
  roomId: string
}

type EventListener = {
  socketEvent: string
  listener: (data: SocketData) => void
}

export const addSocketEventsListeners = (
  socket: Socket | null,
  eventListenersList: Array<EventListener>,
): void => {
  checkSocketExist(socket)

  for (var eventListener of eventListenersList) {
    socket!.on(eventListener.socketEvent, eventListener.listener)
  }
}

export const removeAllSocketEventsListeners = (socket: Socket | null): void => {
  checkSocketExist(socket)
  socket!.offAny()
}

//////////////////////////
// SOCKET EMITTERS
//////////////////////////

export const SocketMessages = Object.freeze({
  FINDING_MATCH: 'match',
})

export const findMatch = (
  socket: Socket | null,
  userId: string,
  difficulty: DifficultyType,
): void => {
  checkSocketExist(socket)
  socket!.emit(SocketMessages.FINDING_MATCH, userId, difficulty)
}
