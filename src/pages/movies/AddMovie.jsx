import React from 'react'
import { useState } from 'react'
import dateToString from '../../helpers/dateToString'
import { checkValidation } from '../../helpers/validation';
import Errors from '../../components/Errors';
import MovieGenres from './MovieGenres';
import {addMovie_UTIL} from "../../utils/movies"
import {useNavigate } from 'react-router-dom';
import checkPermissions from '../../auth/checkperm';
import { useEffect } from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../../styles/styles"

const useFormStyles = makeStyles(formStyles)


export default function AddMovie() {
    const navigate = useNavigate();
    const classes = useFormStyles();


    const [movie, setMovie] = useState({name:"",genres:[],image:"",premiered:""})
    const [errors, setError] = useState("");

    
    useEffect(() => {
        !checkPermissions("add-mov") && navigate("/permdenied")
    }, []);

    const addMovie = async () => {
        const errArr = checkValidation(movie);
        if (errArr.length !== 0) {
            setError(errArr)
            return
        }
        try{
            await addMovie_UTIL(movie);
            navigate("/movies")
        } catch (err) {
            console.log(err);
        }
    }

    const resetForm = ()=> {
        setMovie({name:"",genres:[],image:"",premiered:""})
        setError("");
    }

    const setMovieGenres = (genres) => {
        setMovie({...movie,genres});
    }
    
    return (
        <Box className={classes.box}>

                <Typography 
                    variant="h3" 
                    color="secondary"
                    component="h1" 
                    color="primary">
                        Add Movie
                </Typography>
            
            <TextField 
                type="text" 
                value={movie.name} 
                label="Name" 
                color="secondary"
                size="small"
                margin='dense'
                fullWidth
                onChange={e=>setMovie({...movie,name:e.target.value})} /><br/>
            <TextField 
                type="text" 
                value={movie.image} 
                label="Img Url" 
                color="secondary"
                size="small"
                margin='dense'
                fullWidth
                onChange={e=>setMovie({...movie,image:e.target.value})} /><br/>
            <TextField 
                type="date" 
                max={dateToString()} 
                value={movie.premiered} 
                label="Premiered" 
                color="secondary"
                size="small"
                margin='dense'
                fullWidth
                InputLabelProps={{ // always shrink to top left
                    shrink: true,
                  }}
                onChange={e=>setMovie({...movie,premiered:e.target.value})} /><br/>
            
            
            <MovieGenres setMovieGenres={setMovieGenres} movieGenres={movie.genres} />

            <Errors errors={errors}/>

            <Button type="reset" onClick={resetForm} > reset </Button>
            <Button onClick={addMovie}>add movie</Button>







        </Box>
    )
}
