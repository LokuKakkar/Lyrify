import React from 'react'
import { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import { useDataLayerValue } from './DataLayer';
import './ArtistBodyRight.css'

function ArtistBodyRight({artistname , spotify}) {

    const [{user, token},dispatch] =useDataLayerValue();
    const [PlaylistResults,setPlaylistResults] =useState(null);

    var PlaylistResultParameters ={
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
  
      useEffect(() =>{ fetch(`https://api.spotify.com/v1/search?q=${artistname}&type=playlist`
      ,PlaylistResultParameters)
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => setPlaylistResults(data))
      // .then(data=> console.log(AlbumResults))
  
      },[artistname]);


    const navigate =useNavigate();

    const handlePlaylistClick =event =>{
        event.stopPropagation();

        console.log(event.target.getAttribute("playlistidd"))
        navigate("/playlistscreen" , {state:
          {
            playlistid:event.target.getAttribute("playlistidd"),
            spotify:spotify
          }
    
        })
    }



  return (
    <div>
        {PlaylistResults &&
        <div>
            {PlaylistResults?.playlists?.items?.slice(0,4).map((item,key) => (
                <div>
                    <div className='artist_body_right_top' playlistidd={item.id} onClick={handlePlaylistClick}>
                        <h4 className='playlist_name_artist_body_right_top' playlistidd={item.id} onClick={handlePlaylistClick} > {item?.name} </h4>
                        <img src={item?.images[0]?.url} className='playlist_image_artist_body_right' playlistidd={item.id} onClick={handlePlaylistClick}  />
                    </div>

                </div>
            ))}
        </div>
        }
    </div>
  )
}

export default ArtistBodyRight