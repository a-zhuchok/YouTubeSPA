import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = import.meta.env.VITE_APP_YOUTUBE_API_KEY
const headers = {
  'Content-Type': 'application/json'
};
const config = { headers };

const getVideos = async searchData => {
  const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${searchData.maxResults}&order=${searchData.order}&q=${searchData.request}&type=video&key=${token}`, config)
  return response
};

const getVideoViews = async videoIds => {
  const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${token}`, config)
  return response
};

const fetchGetVideos = createAsyncThunk('videos/fetchGetVideos', async searchData => {
  const { data } = await getVideos(searchData)
  const videoIds = data.items.map((val) => val.id.videoId).join(',')
  const viewsResponse = await getVideoViews(videoIds)
  const videosWithViews = data.items.map(item => {
    const views = viewsResponse.data.items.find(val => val.id === item.id.videoId)
    return {
      ...item,
      viewCount: views ? views.statistics.viewCount : 0,
    }
  })
  return videosWithViews
});

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
      state.data = action.payload
    })
      .addCase(fetchGetVideos.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
  },
})
export { fetchGetVideos }
export default videosSlice.reducer