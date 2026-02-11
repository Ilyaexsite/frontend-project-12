import { createSlice } from '@reduxjs/toolkit'
import { chatApi } from '../api/chatApi'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.getChannels.matchFulfilled,
      (state, action) => {
        if (!state.currentChannelId && action.payload?.length > 0) {
          state.currentChannelId = action.payload[0].id;
        }
      }
    )
  },
})

export const { setCurrentChannel } = channelsSlice.actions
export default channelsSlice.reducer
