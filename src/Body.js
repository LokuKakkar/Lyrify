import React from "react";
import { useState,useEffect } from 'react';
import './Body.css';
// import Header from "./Header";
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Input } from '@mui/material';
import { useDataLayerValue } from './DataLayer';
// import { useDataLayerValue } from "./DataLayer";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from "./SongRow";

import Searched from "./Searched";
import NotSearched from "./NotSearched";

function Body({spotify}){

    // const [{discover_weekly},dispatch] = useDataLayerValue();


    // HERE STARTS HEADERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR

    const [{user, token,discover_weekly},dispatch] =useDataLayerValue();

    const [searchInput, setSearchInput] = useState("");
    const [searchResults,setSearchResults] =useState(null);


    async function search(event){
      // console.log(event)
      // if(event.preventDefault())
      event.preventDefault();
      console.log("searching for " + searchInput + " token: " + token)
    

    // GET request using search to get artist, track, album or playlist

    var searchResultParameters ={
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    var searchResultId = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=album%2Cplaylist%2Cartist%2Ctrack' 
    ,searchResultParameters)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => setSearchResults(data))
    .then(data=> console.log(searchResults))

  }

//   HERE ENDS HEADER FUNCTIONALITIES

    // PLAYER FUNCTIONALITY
    

    return(
        <div className="body">
            {/* <h1>I am Body </h1> */}

            {/* <Header spotify={spotify} /> */}
            {/* HERE STARTS HEADER COMPONENTTTTTTTTTTTTTTTTTTTTTTTTTTTTT */}

            <div className='header'>

                <div className='header_left'>
                    <SearchIcon />
                    {/* <form role='search' onChange={search} onSubmit={hehe} >
                        <input 
                            placeholder='Search for Playlists, Artists, Songs'
                            type='text'
                            name={searchbarData} 
                            // onChange={search} 
                            // onSubmit={hehe}
                            
                        />
                        <button type='submit'>Search</button>
                    </form> */}

                    <form>
                    <input placeholder='search for artist, track or album' type='input' 
                    onKeyDown={event =>{
                        if(event.key=="Enter"){
                        search(event);
                        }
                    }}
                    onChange={event => setSearchInput(event.target.value)}
                    id='SearchInput'
                    >

                    </input>
                    <button onClick={search} id='searchButton'>
                        Search
                    </button>
                    </form>
                    
                    
                    
                </div>

                <div className='header_right'>
                    <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                    <h4> {user?.display_name} </h4>
                </div>
            
            </div>

            {/* HERE ENDSS HEADERRRRRRRRRRRRRRRRRRRRRRRRRRRRRR */}

            {searchResults ? <Searched searchResults={searchResults} />  : <NotSearched discover_weekly={discover_weekly} /> }

            

                       

        </div>
    )

}

export default Body;