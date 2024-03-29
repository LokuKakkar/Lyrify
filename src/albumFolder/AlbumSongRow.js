import React from 'react'
import '../SongRow.css'
import { useNavigate } from 'react-router-dom'

function AlbumSongRow({track,spotify}) {
    console.log(track)
  const navigate =useNavigate();

  const handleTrackClick = event => {
    
    navigate("/lyricsscreen" , {state :
    {
      tracknameforapi: track.name,
      track:track,
      trackid:track.id,
      spotify:spotify
    }})

  }
  return (
    <div className='songrow' onClick={handleTrackClick} >
        
        {/* <img className='songrow_album' src={track.album.images[0].url}  onClick={handleAlbumClick} /> */}
        <div className='rowSong' style={{width:"90%"}}>
            <div className='songrow_info'>

                <h1> {track.name} </h1>

                <p>
                    {track.artists.map((artist)=>
                        artist.name).join(", ")}
                    
                    
                    {track.album?.name}

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

export default AlbumSongRow