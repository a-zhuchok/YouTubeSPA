import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  "Content-Type": "application/json"
}
const config = { headers }
const addUser = async newUser => {
    const response = await axios.post('https://todo-redev.herokuapp.com/api/users/register', JSON.stringify(newUser), config)
    return await response
}
   
const fetchAddUser = createAsyncThunk('user/fetchAddUser', async newUser => {
  const  data  = await addUser(newUser)
  return data
}) 

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
    state.error = action.payload
    })
  },
})
export { fetchAddUser }
export default signFormSlice.reducer