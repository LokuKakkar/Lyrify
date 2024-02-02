import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { useDataLayerValue } from '../DataLayer';
import './LyricsScreen.css';
import LyricsMeaning from '../LyricsMeaning';
// import OpenAI from "openai";




function LyricsScreen() {  
    const location = useLocation();
    const trackid=location.state.trackid;
    // console.log(location.state)
    const [{user, token},dispatch] =useDataLayerValue();
    const [TrackResults,setTrackResults] =useState(null);
    // var trackNameForApi=location.state.tracknameforapi.replace(/\s+/g, '%20').toLowerCase();
    var trackNameForApi=location.state.tracknameforapi;
    // trackNameForApi=trackNameForApi.replace(/&/g , "&amp;")

    const [fullLyrics,setFullLyrics]=useState("");

    const [paras, setparas] = useState([]);
    const [meaning_text, setMeaningText]=useState("");

    var lyricResultParameters ={
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    // var fullLyrics="";

    useEffect(() =>{ fetch('https://api.spotify.com/v1/tracks/' + trackid
    ,lyricResultParameters)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
      setTrackResults(data);
      // setTrackNameForApi(TrackResults?.name?.replace)
      // console.log(TrackResults?.name)
    })
    // .then(() => setTrackNameForApi(TrackResults.name))
    
    // .then(data=> console.log(AlbumResults))
    },[trackid])


    useEffect(() =>{
        // fetch(`https://spotify-lyric-api-984e7b4face0.herokuapp.com/?url=https://open.spotify.com/track/${location.state.trackid}?autoplay=true`)
        // SPOTIFY LYRIC API STOPPED WORKING
        console.log(trackNameForApi);
        fetch(`https://some-random-api.com/others/lyrics/?title=${trackNameForApi}`)
        .then((response) => response.json())

        // .then((datas) => {setparas(datas.lines);
        //     console.log(datas);
        // })
        // .then(() =>{
        //     console.log(paras[1].words);
        // })

        .then((response) => {
          setFullLyrics(response?.lyrics)
          // console.log(response.lyrics);
          var lines=response?.lyrics?.split("\n")
          setparas(lines);
          // console.log(paras[1].words);

        })

        .catch((err) => console.error(err))
        // .then(data => {
        //   data.map((line,index)=>{
        //     fullLyrics+=line+". ";
        //   } )
        // })
          
    },[trackid,trackNameForApi])

    


  return (
    <div> 
    
        <div className="player">
            
            <div className="player_body">

                <Sidebar spotify={location.state.spotify} ancestor="lyrics" />

                <div className='lyrics_body'>
                  <div className='lyrics_text_body'>
                    <div className='lyrics_text'>
                      {paras? paras.map((line,index) => {
                        return (

                          <p className="lyrics"> 
                          {line}
                          </p>

                        )

                      }) : 
                      <div style={{position:"relative" , textAlign: "center" }}>
                        <p style={{position:"absolute" , top:"35vh"  }}>
                        THE LYRICS TO THIS SONG CAN'T BE FOUND
                        </p>
                      </div>
                        }
                    </div>
                    <div className='bottom_space'></div>
                  </div>
                  
                  <div className='lyrics_meaning' >
                    {/* <p>
                      {lyrmean}
                    </p> */}
                    
                    <LyricsMeaning fullLyrics={fullLyrics?.replace(/\n/g, ". ").replace(/\s*\(.*?\)\s*/g, '').replace(/\s*\[.*?\]\s*/g, '')} trackImg={TrackResults?.album?.images[0].url} albumname={TrackResults?.album?.name} track={TrackResults} spotify={location.state.spotify} />

                  </div>
                  <div className='bottom_space'></div>
                  
                  
                </div>
                {/* <div className='bottom_space'></div> */}
                
                
            
            </div>
           


            <Footer track={TrackResults} spotify={location.state.spotify} />
            
        </div>

    
    </div>
  )
}

export default LyricsScreen