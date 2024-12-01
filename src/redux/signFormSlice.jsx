import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json'
};
const config = { headers };

const addUser = async newUser => {
  try {
    const response = await axios.post(import.meta.env.VITE_APP_SIGHUP_URL, JSON.stringify(newUser), config)
    return response.data 
  } catch (error) {
    throw error.response.data || error.message
  }
};
const fetchAddUser = createAsyncThunk('user/fetchAddUser', async newUser => {
  const data = await addUser(newUser)
  return data
});

const signFormSlice = createSlice({
  name: 'newUser',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })
      .addCase(fetchAddUser.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAddUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message.split(' ').map(val=>val==='username' ? 'Введенное имя': val).splice(1, 4).join(' ')
      })
  },
})
export { fetchAddUser }
export default signFormSlice.reducer