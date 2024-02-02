import React from 'react'
import '../Body.css';
import './PlaylistScreen.css'
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from "../SongRow";
import { useDataLayerValue } from '../DataLayer';


function PlaylistScreen() {

    const location = useLocation();
    const playlistid=location.state.playlistid;
    const [{user, token},dispatch] =useDataLayerValue();
    const [playlistResults,setPlaylistResults] =useState(null);

  
    var playlistResultParameters ={
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    useEffect(() =>{ fetch('https://api.spotify.com/v1/playlists/' + playlistid
    ,playlistResultParameters)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => setPlaylistResults(data))
    // .then(data=> console.log(AlbumResults))

    },[playlistid])



  return (
    <div className="player">
            
      <div className="player_body">

        <Sidebar spotify={location.state.spotify} ancestor="playlist" />

        <div className='playlist_body'>

          <div className='playlist_header_and_tracks'>
            <div className='body_info'>
                <img src={playlistResults?.images[0].url} alt='Playlist Image' id='playlist_image' />

                <div className="body_info_text">
                    <strong>PLAYLIST</strong>
                    <h2>{playlistResults?.name}</h2>
                    <p> {playlistResults?.description} </p>

                </div>

            </div>

            
            <div className="body_songs">
                <div className="body_icons">
                    <PlayCircleFilledIcon className="body_shuffle" />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>
                

                {/* LIST OF SONGS */}

                {playlistResults?.tracks?.items?.map(item => (
                    <SongRow track={item.track} spotify={location.state.spotify} />
                ))}

            </div> 


            <div className='bottom_space'></div>
          </div>
          <div className='bottom_space'></div>
          

        </div>
        <div className='bottom_space'></div>
            
      </div>
           
      <Footer spotify={location.state.spotify} />
            
    </div>
  )
}

export default PlaylistScreen