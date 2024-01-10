import React from "react";
import './Footer.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';

import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { Grid,Slider } from "@mui/material";
import LyricsIcon from '@mui/icons-material/Lyrics';




function Footer({track}){

    var trackname= track? track.name: "Redbone";
    var artistnames= track? track.artists.map((artist)=>artist.name).join(", ") : "Childish Gambino";
    var albumimgurl= track? track.album.images[0].url :  "https://upload.wikimedia.org/wikipedia/en/1/10/Childish_Gambino_-_Awaken%2C_My_Love%21.png";


    return(
        <div className="footer">
            {/* <h1>I am Footer </h1> */}

            <div className="footer_left">
                {/* <p> Album and Song Details</p> */}
                <img src={albumimgurl} className="footer_album_logo" />

                <div className="footer_song_info">

                    <h4> {trackname} </h4>
                    <p> {artistnames} </p>

                </div>


            </div>

            <div className="footer_middle">
                {/* <p> Player Controls </p> */}

                <ShuffleIcon className="footer_green" />
                <SkipPreviousIcon className="footer_icon" />
                <PlayCircleOutlineIcon fontSize="large" className="footer_icon" />
                <SkipNextIcon className="footer_icon" />
                <RepeatIcon className="footer_green"/>

            </div>

            <div className="footer_right">
                {/* <p> Volume Controls </p> */}

                <Grid container spacing={2} >
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>

                    <Grid item>
                        <LyricsIcon />
                    </Grid>

                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>

                    <Grid item xs>
                        <Slider/>
                    </Grid>

                </Grid>


            </div>


        </div>
    )

}

export default Footer;