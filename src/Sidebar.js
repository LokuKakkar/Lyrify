import React from "react";
import './Sidebar.css';
import logopng from './images/logopng.png';
import SidebarOption from "./SidebarOption";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SearchIcon from '@mui/icons-material/Search';
import { useDataLayerValue } from "./DataLayer";
import NotSearched from "./NotSearched";

function Sidebar({spotify}){

    const [{playlists},dispatch] = useDataLayerValue();

    function handleSearchClick(){
        document.getElementById("SearchInput").focus();
    }

    function handleHomeClick(){
        document.getElementById("SearchInput").value=null;
    }

    function handlePlaylistClick(event){

        console.log(event.target.getAttribute("uri"));
        <NotSearched discover_weekly={event.target.getAttribute("uri")} />
        
    }

   



    return(
        <div className="sidebar">
            <img src={logopng} className="lyrify_logo"  />

            <SidebarOption title='Home' Icon={HomeIcon} onClick={handleHomeClick} />
            <SidebarOption title='Search' Icon={SearchIcon} onClick={handleSearchClick} />
            <SidebarOption title='Your Library' Icon={LibraryMusicIcon} />


            <br />

            <strong className="sidebar_title"> PLAYLISTS </strong>

            <hr />

            {playlists?.items?.map(playlist => {
                return(
                    <div uri={playlist.uri.substring(17)} onClick={handlePlaylistClick}>
                        <SidebarOption title={playlist.name} uri={playlist.uri.substring(17)}  />
                    </div>
                
            )}) }


        </div>
    )

}

export default Sidebar;