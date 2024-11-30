import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: {
    request: localStorage.getItem('request') || '',
    order: '',
    maxResults: null,
  }
}

const searchDataSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {
    addSearchData: (state, action) => {
      localStorage.setItem('request', action.payload.request)
      state.searchData.request = action.payload.request
      state.searchData.order = action.payload.order
      state.searchData.maxResults = action.payload.maxResults
    },
  },
});

export const { addSearchData } = searchDataSlice.actions;
export default searchDataSlice.reducer;