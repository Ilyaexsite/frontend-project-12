import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null, // 'adding', 'renaming', 'removing'
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.channelId = action.payload.channelId || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
