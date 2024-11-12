import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  Authorization: "Bearer token",
  "Content-Type": "application/json"
}
const config = { headers }
const loginUser = async user => {
  const response = await axios.post(process.env.LOGIN_URL, JSON.stringify(user), config)
  return await response
}
const fetchLoginUser = createAsyncThunk('user/fetchLoginUser', async user => {
  const { data } = await loginUser(user)
  return data
})
const loginSlice = createSlice({
  name: 'user',
  initialState:{},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      console.log(action.payload)
      state.data = action.payload
    })
    .addCase(fetchLoginUser.pending, (state, action) => {
      state.status = 'loading'
      state.error = null
    })
    .addCase(fetchLoginUser.rejected, (state, action) => {
    state.status = 'failed'
    state.error = action.payload
    })
  },
})
export { fetchLoginUser }
export default loginSlice.reducer