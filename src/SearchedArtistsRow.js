import React,{useState} from 'react'
import './SearchedArtistsRow.css'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

function SearchedArtistsRow({artist}){
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='artist_card'>
        <div  className='artist_card_content' onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <CardActionArea>
                <CardMedia
                component="img"
                // height="130"
                image={artist?.images[0]?.url}
                alt={artist?.name}
                className='artist_media'
                />
                <div>
                <Typography gutterBottom variant="h6" component="div" >
                    {artist?.name}
                </Typography>
                <Typography variant="body2" >
                    Artist
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

export default SearchedArtistsRow