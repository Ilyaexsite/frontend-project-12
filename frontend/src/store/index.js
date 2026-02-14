import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './api/chatApi';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';
import modalsReducer from './slices/modalsSlice';

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});
