import React , {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import { AI21 } from "@officialyenum/ai21";
import './LyricsMeaning.css'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';



// import { sendMsgToOpenAI } from './openai';



function LyricsMeaning({fullLyrics , trackImg , albumname,track , spotify}) {
    // const ai = new AI21(process.env.AI21_token);
    const ai = new AI21("sU4p3rfHO6gSwKSmrocbPKGUvjvzYdCo");
    var [lyrmean,setLyrmean]=useState("");
    const data = {
        "text": fullLyrics?.substring(0,499),
        "style": "general" // casual, formal, short
    }

    const [loadingMeaning,setLoadingMeaning]=useState(false);
    var [translateToLanguage,setTranslateToLanguage]=useState("");
    const [selectedListOption, setSelectedListOption]=useState(null);
    const [meaningWanted,setMeaningWanted] = useState(false);
    
    const handleSelectListChange = (e) =>{
      setSelectedListOption(e.target.value);
      console.log(`selected option: ` , selectedListOption)
    }

    const handleSubmit =async (e) =>{
        e.preventDefault();
        // console.log(e.target.toString())
        // const form = e.target;
        // console.log(e)
        // const formData = new FormData(form);
        setLoadingMeaning(true);

        // const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson)
        setTranslateToLanguage(selectedListOption)
        console.log(translateToLanguage)

        if(selectedListOption==null){
          console.log("CHOOSE SOMETHING")
        }
        else if(selectedListOption=="para"){
          // AI21 PARAPHRASING
          const resp = await ai.rewrite(data);
          console.log(resp)
          setLoadingMeaning(false);
          // resp.json();
          setLyrmean(resp?.data?.suggestions[0].text);
        }


        // GOOGLE TRANSLATE
        else{
          const encodedParams = new URLSearchParams();
          encodedParams.set('from', 'auto');
          encodedParams.set('to', selectedListOption);
          encodedParams.set('text', fullLyrics);
          var googleTranslateApiUrl='https://google-translate113.p.rapidapi.com/api/v1/translator/text';
          const options = {
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'X-RapidAPI-Key': '8842600815msh8bc7a24545c4172p1ad34cjsn59b0969524ec',
              'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
            },
            body: encodedParams
          };

          try {
            const gTranslateresponse = await fetch(googleTranslateApiUrl, options);
            const gTranslateresult = await gTranslateresponse.json();
            
            console.log(gTranslateresult.trans);
            setLoadingMeaning(false);
            setLyrmean(gTranslateresult.trans)
          } catch (error) {
            console.error(error);
          }

        }
        
        

    }


    const navigate =useNavigate();

    
    const [isHovered, setIsHovered] = useState(false);

    const handleAlbumClick= event =>{
        event.stopPropagation();
        navigate("/albumscreen" , {state:
          {
            album:track?.album,
            spotify:spotify
          }
    
        })
    }



  return (
    <div className='lyrics_body_right'>

    <div className='lyrics_body_right_top' onClick={handleAlbumClick}>
        <h3 className='album_name_lyrics_body_right_top'> {albumname} </h3>
        <img src={trackImg} className='track_image_lyrics_body_right'  />

    </div>


    <Box sx={{ minWidth: 50 }} className="lyrics_body_right_form" >
      <form onSubmit={handleSubmit} method="post" >
        {/* <label variant="standard" htmlFor="uncontrolled-native">
          Select
        </label> */}
        <select className='select_list_lyrics_body_right_select  select_list_lyrics_body_right'
          defaultValue={null}
          inputProps={{
            name: 'language',
            id: 'uncontrolled-native',
          }}
          onChange={handleSelectListChange}
        >
          
          <option defaultValue value={null} > Select </option>
          <option value={"para"}>Paraphrase</option>
          <option value={"en"}>English</option>
          <option value={"hi"}>Hindi</option>
          <option value={"es"}>Spanish</option>
          <option value={"bn"}>Bengali</option>
          <option value={"bho"}>Bhojpuri</option>
          <option value={"sa"}>Sanskrit</option>
          <option value={"de"}>German</option>
          <option value={"fr"}>French</option>
          
        </select>
        <Button type='submit' variant="contained" color="success" disabled={fullLyrics && loadingMeaning} 
        sx={{
        "&.Mui-disabled": {
          background: "#1f4d33",
          color: "#c0c0c0"
        }
        }}
        ><strong > Submit </strong></Button>
      </form>
    </Box>
        {lyrmean ? 
            <div>
              <h3> Translated: </h3>
              <hr /> <br />
              <p className='lyrics_meaning_text'>
              {lyrmean}
              </p>
            </div>
            : loadingMeaning ? <LoadingSpinner /> : <div>{fullLyrics &&  <p> Try out our Translators  </p>} </div>
        }


    </div>
  )
}

export default LyricsMeaning