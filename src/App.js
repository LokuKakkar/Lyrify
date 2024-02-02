import { useEffect, useState } from 'react';
import Login from './Login.js';
import Player from './Player.js';
import { getTokenFromUrl } from './spotify.js';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const spotify = new SpotifyWebApi();
  const [{user , token}, dispatch] = useDataLayerValue();


  // const [token,setToken]=useState(null);

  useEffect(()=>{
    const hash= getTokenFromUrl();
    const _token = hash.access_token;

    if(_token){

      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })

      // setToken(_token);
      spotify.setAccessToken(_token);

      spotify.getMe().then((user) =>{
        // console.log(user);
        dispatch( {
          type: "SET_USER",
          user: user
        })

      })


      // GET PLAYLISTS
      spotify.getUserPlaylists().then((playlists) =>{

        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        })

      } )

      spotify.getPlaylist('37i9dQZEVXbMDoHDwVN2tF').then(response =>{
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        })
      })
      
      

    }

    window.location.hash="";

  }, []);

  return (
    <div className="App">      
      {/* <Login /> */}

      {token ? <Player spotify={spotify} call="login" /> : <Login />}

    </div>
  );
}

export default App;
