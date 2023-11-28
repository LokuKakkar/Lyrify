import React, { useState } from 'react'
import './SearchedAlbumRow.css'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';


function SearchedAlbumRow ({album}) {
    const [isHovered, setIsHovered] = useState(false);

  return (

    <div className='card'>
        <div  className='card_content' onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="130"
                image={album.images[0].url}
                alt={album.name}
                className='card_media'
                />
                <div>
                <Typography gutterBottom variant="h6" component="div" >
                    {album.artists? (album.name.substring(0,13) + (album.name.length>13 ? "..." : album.name.substring(13,15) )) : (album.name)}
                </Typography>
                <Typography variant="body2" >
                    {album.artists  && album.artists[0]?.name}
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

export default SearchedAlbumRow