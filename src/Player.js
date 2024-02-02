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

                <Sidebar spotify={spotify} ancestor="discover_weekly" />

                {{call}=="login" ? <Body spotify={spotify} /> : <Body spotify={spotify} trackid={trackid} /> }
                {/* <Body spotify={spotify}/> */}
            
            </div>
           


            <Footer spotify={spotify} />
            
        </div>
    )

}

export default Player;