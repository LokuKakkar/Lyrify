import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar';
import Footer from './Footer';
import './LyricsScreen.css'

function LyricsScreen() {
    var lyrmean="The sorrow was immeasurable, Different are the rules of loyalty, Different are the paths if the destinations are separate, why not keep our paths distinct? Why not from today, Erase this fate with our hands, And let the mind be free from memories, Let us dissolve into dust when we meet. Even your city has not reached its end from the journey, Wounds presented, not filled by the ruthless events. Words flowed out that my words should touch your heart. Let me wish upon falling stars that this night may be granted to you. I've been working a lot, I don't stop writing; writing is a breaking. These songs are sold in the millions, Is all this noise about money? Tomorrow we won't be together, but memories will remain, and tell me what life is. Is the garland of memories there, or is there anything else besides memories left? Someone said beautifully that between you, only you stand."

    const location = useLocation();
    // console.log(location.state)


    const [paras, setparas] = useState([]);

    useEffect(() =>{
        fetch(`https://spotify-lyric-api-984e7b4face0.herokuapp.com/?url=https://open.spotify.com/track/${location.state.trackid}?autoplay=true`)
        .then((response) => response.json())
        .then((datas) => {setparas(datas.lines);
            console.log(datas);
        })
        .then(() =>{
            console.log(paras[1].words);
        })
        .catch((err) => console.error(err))


    },[])


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
                          {line.words}
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
                    <p>
                      {lyrmean}
                    </p>
                  </div>
                  <div className='bottom_space'></div>
                  
                  
                </div>
                {/* <div className='bottom_space'></div> */}
                
                
            
            </div>
           


            <Footer track={location.state.track} />
            
        </div>

    
    </div>
  )
}

export default LyricsScreen