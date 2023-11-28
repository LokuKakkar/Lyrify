import React from "react";
// import { useState,useEffect } from 'react';
import './Body.css';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from "./SongRow";

function NotSearched({discover_weekly}){
  return (
    <div>

        <div className="body_info">

        <img src={discover_weekly?.images[0].url}  className="" />

        <div className="body_info_text">
            <strong>PLAYLIST</strong>
            <h2>Discover Weekly</h2>
            <p> {discover_weekly?.description} </p>

        </div>

        </div>

        <div className="body_songs">
        <div className="body_icons">
            <PlayCircleFilledIcon className="body_shuffle" />
            <FavoriteIcon fontSize="large" />
            <MoreHorizIcon />
        </div>

        {/* LIST OF SONGS */}

        {discover_weekly?.tracks.items.map(item => (
            <SongRow track={item.track}  />
        ))}

        </div>    
    
    </div>
  )
}

export default NotSearched