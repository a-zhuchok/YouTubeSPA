import { configureStore } from '@reduxjs/toolkit';
import videosSlice from './redux/videosSlice';
import searchDataSlice from './redux/searchDataSlice';
import favoritesSlice from './redux/favoritesSlice';
import loginSlice from './redux/loginSlice';
import signFormSlice from './redux/signFormSlice';
import modalSlice from './redux/modalSlice';

const store = configureStore({
  reducer: {
    newUser: signFormSlice,
    user: loginSlice,
    searchData: searchDataSlice,
    videos: videosSlice,
    favorites: favoritesSlice,
    modal: modalSlice,
  }})

export default store;