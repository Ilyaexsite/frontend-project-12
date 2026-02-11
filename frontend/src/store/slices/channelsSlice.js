import { createSlice } from '@reduxjs/toolkit'
import { chatApi } from '../api/chatApi'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    currentChannelId: 1,
    items: [],
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.items.push(action.payload)
    },
    removeChannel: (state, action) => {
      state.items = state.items.filter(ch => ch.id !== action.payload);
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = 1
      }
    },
    renameChannel: (state, action) => {
      const channel = state.items.find(ch => ch.id === action.payload.id);
      if (channel) {
        channel.name = action.payload.name
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.getChannels.matchFulfilled,
      (state, action) => {
        state.items = action.payload
      }
    );
  },
})

export const { setCurrentChannel, addChannel, removeChannel, renameChannel } = channelsSlice.actions
export default channelsSlice.reducer
