import React, { useState } from 'react'
import './albumFolder/SearchedAlbumRow.css'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useNavigate } from 'react-router-dom';

function SearchedPlaylistRow ({playlist,spotify,playlistid}) {
    const navigate =useNavigate();

    
    const [isHovered, setIsHovered] = useState(false);

    const handlePlaylistClick= event =>{
        event.stopPropagation();
        navigate("/playlistscreen" , {state:
          {
            playlistid:playlistid,
            spotify:spotify
          }
    
        })
      }

  return (

    <div className='card' onClick={handlePlaylistClick} >
        <div  className='card_content' onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="130"
                image={playlist?.images[0].url}
                alt={playlist?.name}
                className='card_media'
                />
                <div>
                <Typography gutterBottom variant="h6" component="div" >
                    { (playlist?.name.substring(0,13) + (playlist?.name.length>13 ? "..." : playlist?.name.substring(13,15) )) }

                </Typography>
                <Typography variant="body2" >
                    {/* {playlist?.artists  && playlist?.artists[0]?.name} */}
                    { playlist.owner.display_name ? <p>By {playlist?.owner.display_name} </p> : <p>""</p>}
                </Typography>
                </div>
            </CardActionArea>
            {/* Play button */}
            {isHovered && (
                <div className="play_button" >
                <PlayCircleFilledIcon className='play_circle' />
                </div>
            )}
        </div>

    </div>

  )
}

export default SearchedPlaylistRow