import React,{useState,useEffect} from "react";
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
import { useDataLayerValue } from './DataLayer';
import { useNavigate } from 'react-router-dom'


function Footer({ track, spotify}){
    const awakenMyLove = {
      id:"7caGY3YPOchIO8xLvTKWN4"
    };
    const [{user, token},dispatch] =useDataLayerValue();
    const [TrackResults,setTrackResults] =useState(null);

    var trackResultParameters ={
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }

    useEffect(() =>{ fetch('https://api.spotify.com/v1/tracks/' + track? track?.id : "0WtDGnWL2KrMCk0mI1Gpwz"
    ,trackResultParameters)
    .then(response => response.json())
    .then(data => {
      console.log("hehe" + data)
      setTrackResults(data);

    })
    },[track?.id]);

    var trackname= track? track?.name: "Redbone";
    var artistnames= track? track.artists.map((artist)=>artist.name).join(", ") : "Childish Gambino";
    var albumimgurl= track? track.album.images[0].url :  "https://upload.wikimedia.org/wikipedia/en/1/10/Childish_Gambino_-_Awaken%2C_My_Love%21.png";
    var trackid= track? track?.id : "0WtDGnWL2KrMCk0mI1Gpwz";

    const navigate =useNavigate();
    
    
    const handleTrackClick =e =>{
        e.stopPropagation();
        console.log(track?.artists.length)
        navigate("/lyricsscreen" , {state:
            {
              trackid:trackid,
              spotify:spotify,
              tracknameforapi: trackname
            }
          })
          
    }


    const handleArtistClick= event =>{
        event.stopPropagation();
        var thisartistid = event.target.getAttribute("thisArtistId"); 
        navigate("/artistscreen" , {state:
          {
            artistid:thisartistid,
            spotify:spotify
          }
    
        })
      }

    const handleAlbumClick = e =>{
        e.stopPropagation();
        navigate("/albumscreen" , {state:
            {
              album:track? track.album : awakenMyLove,
              spotify:spotify,
            }
          })
    }

      


    return(
        <div className="footer">
            {/* <h1>I am Footer </h1> */}

            <div className="footer_left">
                {/* <p> Album and Song Details</p> */}
                <img src={albumimgurl} className="footer_album_logo" onClick={handleAlbumClick} />

                <div className="footer_song_info">

                    <h4 onClick={handleTrackClick}> {trackname} </h4>
                    {/* <p> {artistnames} </p> */}
                    <p>
                    {track? track.artists.map((artist,key) => {
                        return(
                            <span onClick={handleArtistClick} thisArtistId={artist?.id}> {artist.name} {key=== (track?.artists.length -1) ?  "" : ", "}  </span>
                        )
                    } )  : <span onClick={handleArtistClick} thisArtistId="73sIBHcqh3Z3NyqHKZ7FOL"> Childish Gambino </span> }
                    </p>

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