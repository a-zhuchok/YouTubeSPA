import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  isOpen: false,
  modalData: {
    request: '',
    title: '',
    maxResults: 20,
    order: 'relevance',
  },
}

const modalSlice = createSlice({
  name: 'modalData',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.modalData.title = action.payload;
    },
    openModal: (state, action) => {
      state.modalData = initialState.modalData;
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
    setMaxResults: (state, action) => {
      state.modalData.maxResults = action.payload;
    },
    setOrder: (state, action) => {
      state.modalData.order = action.payload;
    },
    setSelectedRequest: (state, action) => {
      state.modalData.request = action.payload;
    },
    addModalData: (state, action) => {
      state.modalData = action.payload;
    },
    updateModalData: (state, action) => {
      state.modalData = action.payload;
    },
    openModalEdit: (state, action) => {
      const parsedUrl = new URL(action.payload.title.split('*')[0]);
      state.modalData.title = (action.payload.title.split('*')[1]);
      state.modalData.request = (parsedUrl.searchParams.get('q'));
      state.modalData.maxResults = (parsedUrl.searchParams.get('maxResults'));
      state.modalData.order = (parsedUrl.searchParams.get('order'));
      state.id = action.payload.id
      state.isOpen = true;
    },
  },
});

export const { setTitle, setMaxResults, setOrder, setSelectedRequest, addModalData, updateModalData, openModalEdit, openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;