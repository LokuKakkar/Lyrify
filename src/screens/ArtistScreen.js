import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { useDataLayerValue } from '../DataLayer';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArtistTopTrackRow from '../artistFolder/ArtistTopTrackRow';
import ArtistDiscographyRowCard from '../artistFolder/ArtistDiscographyRowCard';
import ArtistRelatedCard from '../artistFolder/ArtistRelatedCard';
import ArtistBodyRight from '../ArtistBodyRight';
import './ArtistScreen.css'

function ArtistScreen() {
  const location = useLocation();
  const artistid=location.state.artistid;
  const [{user, token},dispatch] =useDataLayerValue();
  const [artistResult,setArtistResults] =useState(null);
  const [artistImg,setArtistImg] = useState("");
  const [artistTopTracks,setArtistTopTracks]=useState([]);
  const [artistDiscography,setArtistDiscography]=useState([]);
  const [relatedArtists,setRelatedArtists]=useState([]);


  var artistResultParameters ={
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }

  useEffect(() =>{ 
  // ARTIST
  fetch('https://api.spotify.com/v1/artists/' + artistid
  ,artistResultParameters)
  .then(response => response.json())
  // .then(data => console.log(data))
  .then(data => {
    setArtistResults(data);
    // console.log(data);
    setArtistImg(data.images[0]?.url)
  });

  // TOP_TRACKS
  fetch(`https://api.spotify.com/v1/artists/${artistid}/top-tracks?market=ES`, artistResultParameters)
  .then(response => response.json())
  .then(data => {
    setArtistTopTracks(data.tracks)
    // console.log(data);
  });

  // DISCOGRAPHY
  fetch(`https://api.spotify.com/v1/artists/${artistid}/albums?include_groups=album%2Csingle&market=ES&limit=10&offset=0` , artistResultParameters)
  .then(response => response.json())
  .then(data => {
    setArtistDiscography(data.items)
    // console.log(data.items)
  });

  // RELATED ARTISTS
  fetch(`https://api.spotify.com/v1/artists/${artistid}/related-artists`, artistResultParameters)
  .then(response => response.json())
  .then(data => {
    setRelatedArtists(data.artists)
    // console.log(data.items)
  });



  },[artistid])
  
  return (
    <div className="player">
            
      <div className="player_body">

        <Sidebar spotify={location.state.spotify} ancestor="artist" />

        <div className='artist_body'>
          <div className='artist_header_and_tracks'>
            <div className='artist_header'  >
              {/* <div className='artist_image_container'>
                <img src={artistImg} id='artist_image' />
              </div>
              
              <div className="artist_info_text">
                <h2 style={{fontSize: "5rem"}}><strong> {artistResult?.name} </strong> </h2>
                
                <p style={{fontSize: "2rem"}}>
                  {artistResult?.followers?.total?.toLocaleString()} &nbsp; followers
                </p>

              </div> */}

              <img src={artistResult?.images[0].url} alt='artist Image' id='artist_image' />

              <div className="artist_info_text">
                <strong> Artist </strong>
                <h2> {artistResult?.name} </h2>
                <p> 
                  <strong> {artistResult?.followers?.total?.toLocaleString()} &nbsp; followers </strong> 
                  {artistResult?.genres?.slice(0,3).map(item => (
                    <span style={{textTransform: 'capitalize'}}> &nbsp; {'\u25CF'} &nbsp; {item}  </span>
                  ))} 
                   
                </p>

              </div>

            </div>

            {/* POPULAR TRACKS */}
            <div className='artist_popular_tracks'>
              <br />
              <h2>Popular Tracks</h2>
              <hr />
              <div className="body_icons">
                <PlayCircleFilledIcon className="body_shuffle" />
                <FavoriteIcon fontSize="large" />
                <MoreHorizIcon />
              </div>
              { artistTopTracks?.slice(0,5).map(item => (
                <ArtistTopTrackRow track={item} spotify={location.state.spotify}  />
              ))}

            </div>
            {/* DISCOGRAPHY */}
            <br />
            <h2> Discography </h2>
            <hr />
            <div className='artist_discography'>
              {artistDiscography?.slice(0,8).map(item => (
                <ArtistDiscographyRowCard album={item} spotify={location.state.spotify} />
              ))}
            </div>
            {/* RELATED ARTISTS */}
            <br />
            <h2> Fans also like </h2>
            <hr />
            <div className='artist_related_artists'>
              {relatedArtists?.slice(0,4).map(item => (
                <ArtistRelatedCard artist={item} spotify={location.state.spotify} />
              ))}
            </div>

          </div>

          <div className='artist_right_extras'>

              <div className='bottom_space'></div>
              {/* <AlbumExtraArtistInfo artists={AlbumResults?.artists} /> */}
              {artistResult &&
              <div>
                <h2 >Featuring {artistResult?.name} </h2>
                <hr />
                <ArtistBodyRight artistname={artistResult?.name} spotify={location.state.spotify} />  
              </div>
              }
            
          </div>
        </div>

      </div>
           
      <Footer spotify={location.state.spotify}  />
                 
    </div>

  )
}

export default ArtistScreen