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

const useGridStyles = makeStyles(gridStyles)


export default function MoviesList() {
    const location = useLocation()
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [searchString, setSearchString] = useState([])
    const classes = useGridStyles()


    useEffect(() => {
        !checkPermissions("view-sub") && navigate("/permdenied")
    }, []);
    
     // calling the fetch method on mount and checking permissions
        useEffect(() => {
            (async () => {
            await fetchMovies();
            setSearchString(location.search.split("=")[1]?.replaceAll("%20"," ") || "");
            })()
        },[]);

        useEffect(() => { // handles search movies
            const cloneAllMovies = [...movies]
            cloneAllMovies.forEach(movie => {
            movie.show = movie.name.toLowerCase().includes(searchString.toLowerCase())
            });
            
            setMovies(cloneAllMovies);        
       
        }, [searchString]);
        

        // fetching employees and setting in state
        const fetchMovies = async () => {
            try{
                const allMovies = await getAllMoviesWithMembersWatched_UTIL();
                allMovies.forEach(movie => movie.show = true)
                setMovies(allMovies); // adding "show" key to all the movies
            } catch (err) {
                console.log(err);
            }   
        }


    return <div style={{textAlign:"center"}}>
        <TextField type="search" sx={{width:"40%",marginBottom:2}} label="Search Movie" value={searchString} onChange={e=>setSearchString(e.target.value)} placeholder="search movies" />

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
