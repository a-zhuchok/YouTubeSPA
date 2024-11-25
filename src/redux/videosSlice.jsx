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

const getVideoViews = async videoIds => {
  const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${token}`, config);
  return response;
};

const fetchGetVideos = createAsyncThunk('videos/fetchGetVideos', async value => {
  const { data } = await getVideos(value)
  const videoIds = data.items.map((val) => val.id.videoId).join(','); 
  const viewsResponse = await getVideoViews(videoIds);
 
 const videosWithViews = data.items.map(item => {
  const views = viewsResponse.data.items.find(val => val.id === item.id.videoId);
  return {
      ...item,
      viewCount: views ? views.statistics.viewCount : 0,
  };
});


  return videosWithViews;


})


const searchFavorite = async url => {
  const response = await axios.get(url, config)
  return response
}
const fetchSearchFavorite = createAsyncThunk('videos/fetchSearchFavorite', async url => {
  const { data } = await searchFavorite(url)
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
      state.data = action.payload
    })
      .addCase(fetchGetVideos.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSearchFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.items
       
      })
      .addCase(fetchSearchFavorite.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
  },
})
export { fetchGetVideos, fetchSearchFavorite }
export default videosSlice.reducer