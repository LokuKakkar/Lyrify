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


const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

function Body({spotify}){

    // const [{discover_weekly},dispatch] = useDataLayerValue();


    // HERE STARTS HEADERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR

    const [{user, token,discover_weekly},dispatch] =useDataLayerValue();

    const [searchInput, setSearchInput] = useState("");
    const [searchResults,setSearchResults] =useState(null);

    const handleInputChange = async (event) => {
        const newQuery=event.target.value;
        if(newQuery=="") {setSearchResults(null);
        setSearchInput(null);}
        
        await setSearchInput(newQuery);
        await delay(1000)

        search(newQuery);
    }

    async function search(event){
      // console.log(event)
      // if(event.preventDefault())
    //   event.preventDefault();
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
                    <SearchIcon className="SearchIcon" />
                    
                    <input placeholder='search for artist, track or album' type='input'
                    value={searchInput} 
                    // onKeyDown={event =>{
                    //     if(event.key=="Enter"){
                    //     search(event);
                    //     }
                    // }}
                    onChange={handleInputChange}
                    id='SearchInput'
                    className="form_input"
                    >

                    </input>
                    {/* <button onClick={search} id='searchButton'>
                        Search
                    </button> */}
                    
                    
                    
                    
                </div>

                <div className='header_right'>
                    <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                    <h4> {user?.display_name} </h4>
                </div>
            
            </div>

            {/* HERE ENDSS HEADERRRRRRRRRRRRRRRRRRRRRRRRRRRRRR */}

            {searchInput && searchResults ? <Searched searchResults={searchResults} />  : <NotSearched discover_weekly={discover_weekly} /> }

            

                       

        </div>
    )

}

export default Body;