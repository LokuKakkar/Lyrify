import React from 'react'
import './SongRow.css'

function SongRow({track}) {
  return (
    <div className='songrow'>
        
        <img className='songrow_album' src={track.album.images[0].url}  />
        <div className='rowSong'>
          <div className='songrow_info'>

          <h1> {track.name} </h1>

          <p>
              {track.artists.map((artist)=>
                  artist.name).join(", ")}
              
              
              {track.album.name}

          </p>

          </div>
          <div className='song_duration'>
              <p> { Math.floor((track.duration_ms)/60000) + ":" +
              ( (Math.floor((track.duration_ms)/1000)%60)<10 ?  ( "0" +Math.floor((track.duration_ms)/1000)%60 ) :  ( Math.floor((track.duration_ms)/1000)%60) ) } </p>

          </div>
        </div>
        

    </div>
  )
}

export default SongRow