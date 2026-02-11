import { configureStore } from '@reduxjs/toolkit'
import { chatApi } from './api/chatApi'
import channelsReducer from './slices/channelsSlice'
import messagesReducer from './slices/messagesSlice'

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
})
