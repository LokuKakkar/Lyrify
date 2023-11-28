import React from "react";
import './Sidebar.css';
import logopng from './images/logopng.png';
import SidebarOption from "./SidebarOption";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SearchIcon from '@mui/icons-material/Search';
import { useDataLayerValue } from "./DataLayer";


function Sidebar(){

    const [{playlists},dispatch] = useDataLayerValue();

    function handleSearchClick(){
        document.getElementById("SearchInput").focus();
    }



    return(
        <div className="sidebar">
            <img src={logopng} className="lyrify_logo"  />

            <SidebarOption title='Home' Icon={HomeIcon}  />
            <SidebarOption title='Search' Icon={SearchIcon} onClick={handleSearchClick} />
            <SidebarOption title='Your Library' Icon={LibraryMusicIcon} />


            <br />

            <strong className="sidebar_title"> PLAYLISTS </strong>

            <hr />

            {playlists?.items?.map(playlist => (
                <SidebarOption title={playlist.name} />
                
            )) }


        </div>
    )

}

export default Sidebar;