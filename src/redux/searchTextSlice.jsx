import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchText: '',
}

const searchTextSlice = createSlice({
  name: 'searchText',
  initialState,
  reducers: {
    addSearchText: (state, action) => {
      state.searchText = action.payload
    },
  },
});

export const { addSearchText } = searchTextSlice.actions;
export default searchTextSlice.reducer;