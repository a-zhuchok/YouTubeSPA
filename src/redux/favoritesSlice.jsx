import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorites: (state, action) => {
        state.favorites.push(action.payload)
    },
  },
});

export const { addFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;