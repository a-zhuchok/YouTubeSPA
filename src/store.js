import { configureStore } from '@reduxjs/toolkit';
import videosSlice from './redux/videosSlice';
import searchTextSlice from './redux/searchTextSlice';
import favoritesSlice from './redux/favoritesSlice';
import loginSlice from './redux/loginSlice';
import signFormSlice from './redux/signFormSlice';

const store = configureStore({
  reducer: {
    newUser: signFormSlice,
    user: loginSlice,
    searchText: searchTextSlice,
    videos: videosSlice,
    favorites: favoritesSlice,
  }})

export default store;