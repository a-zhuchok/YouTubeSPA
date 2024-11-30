import React from 'react';
import './App.css';
import Sign from './Components/Sign';
import Login from './Components/Login';
import Search from './Components/Search'
import SearchResult from './Components/SearchResult';
import { Routes, Route } from 'react-router-dom';
import Favorites from './Components/Favorites';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Sign />} />
      <Route path='/login' element={<Login />} />
      <Route path='/search' element={<Search />} />
      <Route path='/searchResult' element={<SearchResult />} />
      <Route path='/favorites' element={<Favorites />} />
    </Routes>
  )
}

export default App