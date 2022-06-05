import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimeDetail from './components/Anime/AnimeDetail';
import Collection from './components/AnimeCollection/Collection';
import CollectionDetail from './components/AnimeCollection/CollectionDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App />}/>
    <Route path='/anime-detail' element={<AnimeDetail />}/>
    <Route path='/collections' element={<Collection />}/>
    <Route path='/collection-detail' element={<CollectionDetail />}/>
  </Routes>
  </BrowserRouter>
);
