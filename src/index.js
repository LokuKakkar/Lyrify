import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataLayer } from './DataLayer';
import reducer, { initialState } from './reducer';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import LyricsScreen from './screens/LyricsScreen';
import AlbumScreen from './screens/AlbumScreen2'
import ArtistScreen from './screens/ArtistScreen'
import PlaylistScreen from './screens/PlaylistScreen';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<App /> } />
      <Route path='/lyricsscreen' element={<LyricsScreen />} />
      <Route path='/albumscreen' element={<AlbumScreen />} />
      <Route path='/artistscreen' element={<ArtistScreen />} />
      <Route path='/playlistscreen' element={<PlaylistScreen />} />
      
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer} >
      <RouterProvider router={router} />
    </DataLayer>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
