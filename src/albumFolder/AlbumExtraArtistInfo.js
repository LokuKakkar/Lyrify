import React , {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './AlbumExtraArtistInfo.css'

function AlbumExtraArtistInfo({artists}) {

    

  return (
    <div className='album_body_right'>
      {artists?.map((item,key)=>{
        <div className='album_right_artist_card'>
          <h2> {item?.name} </h2>
          <img src={item?.images[0].url} />
        </div>
      })}
    </div>
  )
}

export default AlbumExtraArtistInfo