import { io } from 'socket.io-client'
import store from '../store/index.js'
import { addMessage, removeMessageByChannelId } from '../store/slices/messagesSlice.js'
import { addChannel, removeChannel, renameChannel } from '../store/slices/channelsSlice.js'
import { toast } from 'react-toastify'

let socket = null

export const initializeSocket = (i18n) => {
  socket = io()

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload))
  })

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload))
    toast.success(i18n.t('notifications.success.channelCreated'))
  })

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload))
    store.dispatch(removeMessageByChannelId(payload))
    toast.success(i18n.t('notifications.success.channelRemoved'))
  })

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload))
    toast.success(i18n.t('notifications.success.channelRenamed'))
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.')
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
