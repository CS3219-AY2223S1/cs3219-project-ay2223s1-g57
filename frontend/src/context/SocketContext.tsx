import React, { createContext, useContext, useState } from 'react'
import { Socket } from 'socket.io-client'

type SocketContextType = {
  socket: Socket | null
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>
}

const initialSocketContextState = {
  socket: null,
  setSocket: (): void => {
    throw new Error('setSocket function must be overridden')
  },
}

const SocketContext = createContext<SocketContextType>(
  initialSocketContextState,
)

export const useSocket = () => useContext(SocketContext)

type Props = {
  children?: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  )
}
