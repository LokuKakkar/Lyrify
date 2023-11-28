import React from "react";
import LyrifyLogo from "./images/LyrifyLogo.jpg"
import logopng from "./images/logopng.png";
import "./Login.css"
import {loginUrl} from "./spotify.js";
function Login(){

    return (
        <div className="login">

            {/* SpotifyLOGO */}
            {/* Login with spotify */}
            <img src={logopng} alt="spotify logo" />
            <a href={loginUrl}>Login With Spotify</a>

            


        </div>
    )

}

export default Login;