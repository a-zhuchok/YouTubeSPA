import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('user')
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
};
const config = { headers };

const getFavorites = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_URL, config)
  return await response
};
const fetchGetFavorites = createAsyncThunk('favorites/fetchGetFavorites', async () => {
  const { data } = await getFavorites()
  return data
});
const addFavorites = async favorites => {
  const response = await axios.post(import.meta.env.VITE_APP_URL, ({ title: favorites }), config)
  return response
};
const fetchAddFavorites = createAsyncThunk('favorites/fetchAddFavorites', async favorites => {
  const { data } = await addFavorites(favorites)
  return data
});
const deleteFavorite = async favorite => {
  const response = await axios.delete(import.meta.env.VITE_APP_URL + '/' + favorite.id, config)
  return response
};
const fetchDeleteFavorite = createAsyncThunk('favorites/fetchDeleteFavorite', async favorite => {
  const { data } = await deleteFavorite(favorite)
  return data
});
const editFavorite = async editData => {
  const response = await axios.patch(import.meta.env.VITE_APP_URL + '/' + editData.editDataId, { title: editData.editDataTitle }, config)
  return response
};
const fetchEditFavorite = createAsyncThunk('favorites/fetchEditFavorite', async editData => {
  const { data } = await editFavorite(editData)
  return data
});

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetFavorites.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })
      .addCase(fetchGetFavorites.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAddFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data.push(action.payload.title)
      })
      .addCase(fetchDeleteFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.filter((favorite) => favorite.id !== action.payload.id)
      })
      .addCase(fetchDeleteFavorite.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchEditFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.map((favorite) => favorite.id === action.payload.id ? action.payload : favorite)
      })
  },
})
export { fetchGetFavorites, fetchAddFavorites, fetchDeleteFavorite, fetchEditFavorite }
export default favoritesSlice.reducer