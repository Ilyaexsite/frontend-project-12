import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/slices/messagesSlice';

const SocketContext = createContext()

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { user } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.token) {
      // Создаем соединение с токеном
      const newSocket = io({
        auth: { token: user.token },
        transports: ['websocket'],
      })

      newSocket.on('connect', () => {
        console.log('Socket connected')
      })

      newSocket.on('newMessage', (message) => {
        dispatch(addMessage(message));
      })

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
      })

      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }
  }, [user, dispatch])

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('newMessage', message, (response) => {
        console.log('Message delivered:', response);
      })
    }
  }

  return (
    <SocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  )
}
