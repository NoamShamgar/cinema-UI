import React from 'react'
import { useState } from 'react'

//MUI
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function MovieGenres(props) {
    const [movieGenreInput,setMovieGenreInput] = useState("")

    const addTextToGenres = () => {
        if (movieGenreInput !== "") {
            props.setMovieGenres([...props.movieGenres,movieGenreInput]);
            setMovieGenreInput("")
        }
    }

    const deleteGenre = (i) => {
        const newGenres = [...props.movieGenres];
        newGenres.splice(i,1)
        props.setMovieGenres(newGenres)
    }

    return (
        <div>
            <hr/>
            <Box sx={{display:"flex"}}>
            <TextField sx={{flexGrow:1}} type="text" value={movieGenreInput} size="small" label="Genre" onChange={e=>setMovieGenreInput(e.target.value)} /><br/>
            <Button onClick={addTextToGenres}>Add</Button>
            </Box>

            {props.movieGenres.map((genre,i) => <Typography color="secondary" sx={{display:"inline-block"}} key={i} onClick={()=>deleteGenre(i)}>  {i !== 0 && ","} {genre} </Typography>)}
       
        </div>
    )
}
