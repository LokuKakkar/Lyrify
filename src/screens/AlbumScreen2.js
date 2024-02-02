import React from 'react'
import { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import './AlbumScreen.css'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AlbumSongRow from "../albumFolder/AlbumSongRow";
// import AlbumExtraArtistInfo from '../albumFolder/AlbumExtraArtistInfo';
import { useDataLayerValue } from '../DataLayer';
import { Album } from '@mui/icons-material';
import AlbumBodyRight from '../AlbumBodyRight';


function AlbumScreen() {
  const location = useLocation();
  const albumid=location.state.album.id;
  const [{user, token},dispatch] =useDataLayerValue();
  const [AlbumResults,setAlbumResults] =useState(null);


  
    var albumResultParameters ={
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    useEffect(() =>{ fetch('https://api.spotify.com/v1/albums/' + albumid
    ,albumResultParameters)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => setAlbumResults(data))
    // .then(data=> console.log(AlbumResults))



    },[albumid]);

    // useEffect(() => {
    //   fetch('https://api.spotify.com/v1/artists/' + AlbumResults?.artists[0]?.id , albumResultParameters)
    //   .then(response => response.json())
    // // .then(data => console.log(data))
    // .then(data => { 
    //   console.log(data);
    //   setArtistResults(data);
    // })

    // },[albumid]);
    



    const navigate =useNavigate();
    
    const handleArtistClick= event =>{
        event.stopPropagation();
        navigate("/artistscreen" , {state:
          {
            artistid:AlbumResults?.artists[0].id,
            artist:AlbumResults?.artists[0],
            spotify:location.state.spotify
          }
    
        })
      }
  

  return (
    <div className="player">
            
      <div className="player_body">

        <Sidebar spotify={location.state.spotify} ancestor="album" />

        <div className='album_body'>

          <div className='album_header_and_tracks'>
            <div className='album_header'>
              <img src={AlbumResults?.images[0].url} alt='Album Image' id='album_image' />

              <div className="album_info_text">
                <strong> {AlbumResults?.album_type} </strong>
                <h2> {AlbumResults?.name} </h2>
                <p> 
                  <strong onClick={handleArtistClick}>{AlbumResults?.artists[0].name} </strong> &nbsp; {'\u25CF'} {AlbumResults?.release_date.substring(0,4)} &nbsp; {'\u25CF'} {AlbumResults?.total_tracks} songs &nbsp; 
                </p>

              </div>

            </div>
            <div className='album_tracks'>

              <div className="body_icons">
                <PlayCircleFilledIcon className="body_shuffle" />
                <FavoriteIcon fontSize="large" />
                <MoreHorizIcon />
              </div>
            

              {/* LIST OF SONGS */}

              { AlbumResults?.tracks?.items.map(item => (
                <AlbumSongRow track={item} spotify={location.state.spotify}  />
              ))}

            </div>
            <div className='bottom_space'></div>
          </div>

           
          <div className='album_right_extras'>
              <div className='bottom_space'></div>
            {/* <AlbumExtraArtistInfo artists={AlbumResults?.artists} /> */}
            {AlbumResults &&
            <div>
            <h2 >Artists on the Album </h2>
            <hr />
             {AlbumResults?.artists.map((item) => (
             <AlbumBodyRight artistid={item?.id} spotify={location.state.spotify}  />
             ))}
            </div>
             }
            

          </div>
          <div className='bottom_space'></div>

        </div>
        {/* <div className='bottom_space'></div> */}


            
      </div>
           
      <Footer spotify={location.state.spotify} />
            
    </div>
  )
}

export default AlbumScreen