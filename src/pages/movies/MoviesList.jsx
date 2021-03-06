import React from 'react'
import { useState,useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {getAllMoviesWithMembersWatched_UTIL} from "../../utils/movies"
import Movie from "./Movie";

//MUI
import { Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {gridStyles} from "../../styles/styles"
import checkPermissions from '../../auth/checkperm';
import CircularProgress from '@mui/material/CircularProgress';

const useGridStyles = makeStyles(gridStyles)


export default function MoviesList() {
    const location = useLocation()
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [searchString, setSearchString] = useState("")
    const [loading, setLoading] = useState(true)
    const classes = useGridStyles()


    useEffect(() => { // authorizaion
        !checkPermissions("view-mov") && navigate("/permdenied")
    }, []);
    
    // calling the fetch method on mount set the search string from the url query if exist
    useEffect(() => {
        (async () => {
        await fetchMovies();
        setSearchString(location.search.split("=")[1]?.replaceAll("%20"," ") || "");
        })()
    },[]);

    useEffect(() => { // searching on every input change
        showSearchedMovies();
    }, [searchString]);


    const showSearchedMovies = (clonedMovies = [...movies]) => { // setting show to the movies that passes the search
        clonedMovies.forEach(movie => {
                movie.show = movie.name.toLowerCase().includes(searchString.toLowerCase()) // if searchString is empty, this will return true
        });
        setMovies(clonedMovies); 
    }
        
    // fetching Movies and setting in state
    const fetchMovies = async () => {
        try{
            const allMovies = await getAllMoviesWithMembersWatched_UTIL();
            showSearchedMovies(allMovies);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }   
    }


    return <div style={{textAlign:"center"}}>
        <TextField type="search" sx={{width:"40%",marginBottom:2}} label="Search Movie" value={searchString} onChange={e=>setSearchString(e.target.value)} placeholder="search movies" />

        {loading&&<CircularProgress sx={{display:"block",margin:"auto",width:"50%"}} disableShrink color="primary" />}

            <Grid container className={classes.gContainer}>
            {movies.map((movie,i) => movie.show&&
                <Grid key={i}  item>
                    
                                <Movie 
                                    movie={movie} 
                                    fetchMovies={fetchMovies}
                                />
                 </Grid>
                )}
            </Grid>
            <Outlet/>
        </div>
    
}
