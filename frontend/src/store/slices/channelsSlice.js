import { createSlice } from '@reduxjs/toolkit';
import { chatApi } from '../api/chatApi';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    currentChannelId: 1, // general канал по умолчанию
    items: [],
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        chatApi.endpoints.getChannels.matchFulfilled,
        (state, action) => {
          state.items = action.payload;
          // Если текущий канал не существует (например, удален), переключаем на general
          const currentExists = action.payload.some(
            (ch) => ch.id === state.currentChannelId
          );
          if (!currentExists && action.payload.length > 0) {
            state.currentChannelId = action.payload[0].id;
          }
        }
      )
      .addMatcher(
        chatApi.endpoints.addChannel.matchFulfilled,
        (state, action) => {
          // После добавления канала переключаемся на него
          state.currentChannelId = action.payload.id;
        }
      )
      .addMatcher(
        chatApi.endpoints.removeChannel.matchFulfilled,
        (state, action) => {
          // Если удалили текущий канал, переключаемся на general
          if (state.currentChannelId === action.meta.arg.originalArgs) {
            const generalChannel = state.items.find((ch) => ch.id === 1);
            if (generalChannel) {
              state.currentChannelId = 1;
            }
          }
        }
      );
  },
});

export const { setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
