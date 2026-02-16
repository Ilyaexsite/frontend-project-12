import { createSlice } from '@reduxjs/toolkit';
import { chatApi } from '../api/chatApi';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    sendingStatus: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.items.push(action.payload)
    },
    setMessages: (state, action) => {
      state.items = action.payload
    },
    setSendingStatus: (state, action) => {
      state.sendingStatus = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.getMessages.matchFulfilled,
      (state, action) => {
        state.items = action.payload
      }
    );
  },
})

export const { addMessage, setMessages, setSendingStatus, setError } = messagesSlice.actions
export default messagesSlice.reducer
