import { useEffect, useState } from 'react';
import Login from './Login.js';
import Player from './Player.js';
// import { getTokenFromUrl } from './spotify.js';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const spotify = new SpotifyWebApi();
  const [{user , token}, dispatch] = useDataLayerValue();


  // const [token,setToken]=useState(null);

  useEffect(() => {
    const fetchSpotifyToken = async () => {
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': 'fa82187641274f03b6f453d527a21165',
            'client_secret': 'b0bf0329d77d45a8a95d0ce6b6860f8f'
          })
        });

        const data = await response.json();
        const _token = data.access_token;
        console.log({_token});

        if (_token) {
          dispatch({
            type: 'SET_TOKEN',
            token: _token
          });

          spotify.setAccessToken(_token);

          // Rest of your existing code...
          spotify.getMe().then((user) => {
            dispatch({
              type: "SET_USER",
              user: user
            });
          });

          spotify.getUserPlaylists().then((playlists) => {
            dispatch({
              type: "SET_PLAYLISTS",
              playlists: playlists,
            });
          });

          spotify.getPlaylist('37i9dQZEVXbMDoHDwVN2tF').then(response => {
            dispatch({
              type: 'SET_DISCOVER_WEEKLY',
              discover_weekly: response,
            });
          });
        }
      } catch (error) {
        console.error('Error fetching Spotify token:', error);
      }
    };

    fetchSpotifyToken();
  }, []);

  return (
    <div className="App">      
      {/* <Login /> */}

      {token ? <Player spotify={spotify} call="login" /> : <Login />}

    </div>
  );
}

export default App;
