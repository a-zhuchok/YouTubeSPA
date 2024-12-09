import React from 'react';
import './App.css';
import Sign from './Pages/Sign';
import Login from './Pages/Login';
import Search from './Pages/Search'
import SearchResult from './Pages/SearchResult';
import { Routes, Route } from 'react-router-dom';
import Favorites from './Pages/Favorites';
import PrivateRoute from './Components/PrivateRoute';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Sign />} />
      <Route path='/login' element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path='/search' element={<Search />} />
        <Route path='/searchResult' element={<SearchResult />} />
        <Route path='/favorites' element={<Favorites />} />
      </Route>
    </Routes>
  )
}

export default App