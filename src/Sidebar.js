import React from "react";
import './Sidebar.css';
import logopng from './images/logopng.png';
import SidebarOption from "./SidebarOption";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SearchIcon from '@mui/icons-material/Search';
import { useDataLayerValue } from "./DataLayer";
import NotSearched from "./NotSearched";
import { useNavigate } from "react-router-dom";

function Sidebar({spotify , ancestor}){
    const navigate =useNavigate();
    const [{playlists},dispatch] = useDataLayerValue();

    const handleSearchClick = () => {
        if(ancestor=="discover_weekly"){
            document.getElementById("SearchInput").focus();
        }
        else{
            navigate("/" , {state : {
                spotify : spotify,
            }})
        }
        
        
    }

    const handleHomeClick = () => {
        navigate("/" , {state : {
            spotify : spotify,
        }})
        // document.getElementById("SearchInput").value=null;
        // document.getElementById("SearchInput").value=null;
    }

    const handlePlaylistClick =  (event)  => {

        console.log(event.target.getAttribute("uri"));
        // <NotSearched discover_weekly={event.target.getAttribute("uri")} />
        navigate("/playlistscreen" , {state : {
            spotify : spotify,
            playlistid : event.target.getAttribute("uri"),
        }})

        
    }

   



    return(
        <div className="sidebar">
            <img src={logopng} className="lyrify_logo"  onClick={handleHomeClick}/>

            <SidebarOption title='Home' Icon={HomeIcon} onClick={handleHomeClick} />
            <SidebarOption title='Search' Icon={SearchIcon} onClick={handleSearchClick} />
            <SidebarOption title='Your Library' Icon={LibraryMusicIcon} />


            <br />

            <strong className="sidebar_title"> PLAYLISTS </strong>

            <hr />

            {playlists?.items?.map(playlist => {
                return(
                    <div uri={playlist.uri.substring(17)} onClick={handlePlaylistClick}>
                        <SidebarOption title={playlist.name} uri={playlist.uri.substring(17)} spotify={spotify}  />
                    </div>
                
            )}) }


        </div>
    )

}

export default Sidebar;