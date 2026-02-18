import { useEffect } from 'react'
import { getSocket } from './index.js'

export const useSocket = (event, handler) => {
  useEffect(() => {
    const socket = getSocket()

    socket.on(event, handler)

    return () => {
      socket.off(event, handler)
    }
  }, [event, handler])
}

export const emitEvent = (event, data) => {
  const socket = getSocket()
  socket.emit(event, data)
}
