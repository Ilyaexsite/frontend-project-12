import { configureStore } from '@reduxjs/toolkit'
import { chatApi } from './api/chatApi'
import channelsReducer from './slices/channelsSlice'

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    channels: channelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
})
