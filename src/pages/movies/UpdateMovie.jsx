import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { getMovie_UTIL, updateMovie_UTIL } from '../../utils/movies';
import Errors from '../../components/Errors';
import { checkValidation } from '../../helpers/validation';
import MovieGenres from './MovieGenres';
import dateToString from '../../helpers/dateToString';


//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../../styles/styles"

const useFormStyles = makeStyles(formStyles)


export default function UpdateMovie(props) {
    const [movie, setMovie] = useState({name:"",genres:[],image:"",premiered:""})
    const [errors, setError] = useState("");
    const classes = useFormStyles();


    useEffect(() => {
        (async function callFetchData() {
            try{
                setMovie(await getMovie_UTIL(props.id));
           } catch (err) {
               console.log(err);
           }
        })()
    }, [])

    const setMovieGenres = (genres) => {
        setMovie({...movie,genres});
    }

    const updateMovie = async () => {
        const errArr = checkValidation(movie);
        if (errArr.length !== 0) {
            setError(errArr)
            return
        }
        try {
            await updateMovie_UTIL(props.id,movie);
            props.fetchMovies();
            props.hideUpdateModal();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>

            <div className={classes.updateBG} onClick={props.hideUpdateModal}></div>

            <Box className={`${classes.box} ${classes.fixedBox}`}>
            <Typography 
                            variant="h3" 
                            color="secondary"
                            component="h1" 
                            color="primary">
                                Update Movie
                        </Typography> 
                                   
                                   
            <TextField 
                type="text" 
                value={movie.name} 
                label="Name" 
                className={classes.input} 
                color="secondary"
                size="small"
                margin='dense'
                onChange={e=>setMovie({...movie,name:e.target.value})} /><br/>


            <TextField 
                type="text" 
                label="image Url" 
                value={movie.image} 
                className={classes.input} 
                color="secondary"
                size="small"
                margin='dense'
                onChange={e=>setMovie({...movie,image:e.target.value})} /><br/>
            <TextField 
                type="date" 
                label="Premiered" 
                max={dateToString()} 
                value={dateToString(movie.premiered)} 
                className={classes.input} 
                color="secondary"
                size="small"
                margin='dense'
                onChange={e=>setMovie({...movie,premiered:e.target.value})} /><br/>
            <MovieGenres setMovieGenres={setMovieGenres} movieGenres={movie.genres} />


                    <Button onClick={updateMovie}>Update</Button>
                
                
                <Errors errors={errors}/>
                


            </Box>
        </div>
    )
}
