import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimeDetail from './components/Anime/AnimeDetail';
import ListCollection from './components/AnimeCollection/ListCollection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App />}/>
    <Route path='/anime-detail' element={<AnimeDetail />}/>
    <Route path='/collections' element={<ListCollection />}/>
  </Routes>
  </BrowserRouter>
);
