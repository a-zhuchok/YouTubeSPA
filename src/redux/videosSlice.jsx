import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const token = 'AIzaSyAoTqyWPNEkPxJzA8pjaP3eUYUZYn8oiiY'
const headers = {
  "Content-Type": "application/json"
}
const config = { headers }
const getVideos = async value => {
  const response = await axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q='+ value +'&type=video&key=AIzaSyAoTqyWPNEkPxJzA8pjaP3eUYUZYn8oiiY', config)
  return response
}
const fetchGetVideos = createAsyncThunk('videos/fetchGetVideos', async value => {
  const { data } = await getVideos(value)
  return data
})

const initialState = {
  videos: [],
};
const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetVideos.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload.items
    })
      .addCase(fetchGetVideos.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
  },
})
export { fetchGetVideos }
export default videosSlice.reducer