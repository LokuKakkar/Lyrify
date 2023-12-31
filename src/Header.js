import React from 'react'
import { useState,useEffect } from 'react';
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Input } from '@mui/material';
import { useDataLayerValue } from './DataLayer';
// import { Form } from 'react-bootstrap';
// import { InputGroup,FormControl,Button } from 'react-bootstrap';


function Header({spotify}){
    const [{user, token},dispatch] =useDataLayerValue();

    const [searchInput, setSearchInput] = useState("");


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
    .then(data => console.log(data));

  }

  return (
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

            {/* <form> */}
              <input placeholder='search for artist, track or album' type='input' 
              onKeyDown={event =>{
                if(event.key=="Enter"){
                  search(event);
                }
              }}
              onChange={event => setSearchInput(event.target.value)}
              id='SearchInput'
              className="form_input"
              >

              </input>
              {/* <button onClick={search} id='searchButton' className='form_button'> */}
                {/* Search */}
              {/* </button> */}
            {/* </form> */}
            
            
            
        </div>

        <div className='header_right'>
            <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
            <h4> {user?.display_name} </h4>
        </div>
    
    </div>
  )
}

export default Header