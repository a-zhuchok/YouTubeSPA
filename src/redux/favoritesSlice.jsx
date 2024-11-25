import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('user')
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
}
const config = { headers }
const getFavorites = async () => {
  const response = await axios.get('https://todo-redev.herokuapp.com/api/todos', config)
  return await response
}
const fetchGetFavorites = createAsyncThunk('favorites/fetchGetFavorites', async () => {
  const { data } = await getFavorites()
  console.log(data)
  return data
})

const addFavorites = async favorites => {
  console.log(favorites)
  const response = await axios.post('https://todo-redev.herokuapp.com/api/todos', ({ title: favorites }), config)
  return response
}
const fetchAddFavorites = createAsyncThunk('favorites/fetchAddFavorites', async favorites => {
  const { data } = await addFavorites(favorites)
  console.log(data)
  return data
})

const deleteFavorite = async favorite => {
  const response = await axios.delete('https://todo-redev.herokuapp.com/api/todos' + '/' + favorite.id, config)
  return response
}
const fetchDeleteFavorite = createAsyncThunk('favorites/fetchDeleteFavorite', async favorite => {
  const { data } = await deleteFavorite(favorite)
  return data
})


const initialState = {
  favorites: [],
};
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
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
      state.data=state.data.filter((favorite) => favorite.id !== action.payload.id)
    })
    .addCase(fetchDeleteFavorite.pending, (state, action) => {
      state.status = 'loading'
      state.error = null
    }) 
     
  },
})
export {  fetchGetFavorites, fetchAddFavorites, fetchDeleteFavorite }
export default favoritesSlice.reducer