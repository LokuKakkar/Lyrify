import React from "react";
import './Player.css';
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

function Player({spotify,call,trackid}){
    console.log({call});
    return (
        <div className="player">
            
            <div className="player_body">

                <Sidebar spotify={spotify} />

                {{call}=="login" ? <Body spotify={spotify} /> : <Body spotify={spotify} trackid={trackid} /> }
                {/* <Body spotify={spotify}/> */}
            
            </div>
           


            <Footer />
            
        </div>
    )

}

export default Player;