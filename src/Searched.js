import React from 'react'
import './Searched.css'
import SearchedSongRow from './SearchedSongRow'
import SearchedAlbumRow from './SearchedAlbumRow'
import SearchedArtistsRow from './SearchedArtistsRow'

function Searched({searchResults}){
  return (
    <div className='Searched'>
        
        <div className='tracks'>

            <h2>Top Results</h2>

            {searchResults?.tracks?.items?.slice(0,4).map((item,index) =>(
                <SearchedSongRow track={item} />
            ))}

        </div>

        <div className='albums'>

            <h2>Albums</h2>
            <div className='albumsList'>
                {searchResults?.albums?.items?.slice(0,4).map(item => (
                    <SearchedAlbumRow album={item} />
                ))}
            </div>

           

        </div>

        <div className='playlists'>

            <h2>Featured Playlists</h2>
            <div className='playlistsList'>
                
                {searchResults?.playlists?.items?.slice(0,4).map(item => (
                    <SearchedAlbumRow album={item} />
                ))}

            </div>

        </div>

        <div className='artists'>
            <h2>Top Artists</h2>
            <div className='artistsList'>
                    
                {searchResults?.artists?.items?.slice(0,5).map(item =>(
                    <SearchedArtistsRow artist={item} />
                ))}

            </div>

        </div>
        
    </div>
  )
}

export default Searched