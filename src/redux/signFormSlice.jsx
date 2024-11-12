import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  "Content-Type": "application/json"
}
const config = { headers }
const addUser = async newUser => {
    const response = await axios.post(process.env.SIGHUP_URL, JSON.stringify(newUser), config)
    console.log('response',newUser)
    return await response.json()
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
        console.log('data',action.payload)
    })
  },
})
export { fetchAddUser }
export default signFormSlice.reducer