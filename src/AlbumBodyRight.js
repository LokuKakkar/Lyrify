import React from 'react'
import { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import { useDataLayerValue } from './DataLayer';
import './AlbumBodyRight.css'

function AlbumBodyRight({artistid,spotify}) {
    const [{user, token},dispatch] =useDataLayerValue();
    const [artistResults,setArtistResults] =useState(null);

    var artistResultParameters ={
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
  
      useEffect(() =>{ fetch('https://api.spotify.com/v1/artists/' + artistid
      ,artistResultParameters)
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => setArtistResults(data))
      // .then(data=> console.log(AlbumResults))
  
      },[artistid]);


    const navigate =useNavigate();

    const handleArtistClick =event =>{
        event.stopPropagation();
        navigate("/artistscreen" , {state:
          {
            artistid:artistid,
            artist:artistResults,
            spotify:spotify
          }
    
        })
    }


  return (
    <div>
    {artistResults &&
            <div className='artist_results_in_album'>
              <div className='album_body_right_top' onClick={handleArtistClick}>
                <h4 className='artist_name_album_body_right_top'> {artistResults?.name} </h4>
                <img src={artistResults?.images[0]?.url} className='artist_image_album_body_right'  />
              </div>
            </div> 
           }
    </div>
  )
}

export default AlbumBodyRight