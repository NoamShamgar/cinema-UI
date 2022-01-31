import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateToString from '../../helpers/dateToString';
import { getAllMovies_UTIL } from '../../utils/movies';
import { addSubscription_UTIL,addMovieToSubscription_UTIL } from '../../utils/subscriptions';
import Errors from '../../components/Errors';
import { checkValidation } from '../../helpers/validation';


// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function AddMovieToMember(props) {
  const [moviesArr, setMoviesArr] = useState([]);
  const [date, setDate] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [errors, setError] = useState("");

  useEffect(() => {
    let unmounted = false;
    setDate("");
    
    (async () => {
        try {
            const allMovies = await getAllMovies_UTIL();
            
            // removing subscribed movies from all movies
            props.watchedMovies.forEach(watchedMovie => {
                const index = allMovies.findIndex(movie => movie._id === watchedMovie._id);
                allMovies.splice(index,1);
            });

            if  (!unmounted){ // local variable to prevent react error which we try to update state on unmounted component
              setMoviesArr(allMovies);
            }
        } catch (err) {
            console.log(err);
        }
    })()
   

   return () => {
    unmounted = true
  }
   
  }, []);


  
  
  
 

  const addToSub = async () => {
    const errArr = checkValidation({anyDate:date,selectedMovieId}); // changing the name of the date so the validation won't prevent future dates
    if (errArr.length !== 0) {
        setError(errArr)
        return
    }
    try {
      if(props.subId) { // subscription already exist, add to exist 
        await addMovieToSubscription_UTIL(props.subId,{movieId:selectedMovieId, watchDate:date});

      } else { // first time subscribe, create a new subscribe document
        await addSubscription_UTIL({memberId:props.memberId,movies:[{movieId:selectedMovieId,watchDate:date}]});
      }
      props.closeAddSub();
      props.fetchMembers();

    } catch (err) {
      console.log(err);
    }
  }


  const preWatchedMovies = (
    <FormControl fullWidth>

        <InputLabel>Movie</InputLabel>
        <Select
              value={selectedMovieId}
              label="Movie"
              onChange={e=>setSelectedMovieId(e.target.value)}
            >
            <MenuItem value=""></MenuItem>
                {moviesArr.map((movie,i) => 
                  <MenuItem key={i} value={movie._id}>{movie.name}</MenuItem>

                  )};

          </Select>
      </FormControl>  )

        


  return <div style={{textAlign:"center",padding:"20px"}}>
                  
              <Typography>Add movie to the subscription</Typography>
              <Box sx={{display:"flex"}}>
                    {preWatchedMovies}

                    <TextField 
                      sx={{width:0.6}} 
                      label="Date Watched"  
                      InputLabelProps={{shrink: true}} 
                      type="date" 
                      value={date} 
                      min={dateToString()} 
                      onChange={e=>setDate(e.target.value)}/>

              </Box>
                    <Button onClick={addToSub}>Add</Button>
                    <Errors errors={errors}/>



  </div>
}
