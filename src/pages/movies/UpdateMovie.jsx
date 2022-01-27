import React from 'react'
import { useState } from 'react';
import "../../styles/modal.css"
import { useEffect } from 'react';
import { getMovie_UTIL, updateMovie_UTIL } from '../../utils/movies';
import Errors from '../../components/Errors';
import { checkValidation } from '../../helpers/validation';
import MovieGenres from './MovieGenres';
import dateToString from '../../helpers/dateToString';

export default function UpdateMovie(props) {
    const [movie, setMovie] = useState({name:"",genres:[],image:"",premiered:""})
    const [errors, setError] = useState("");


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

            <div className='background' onClick={props.hideUpdateModal}></div>

            <div className='contentContainer'>
            <h1>update movie</h1>
            name: <input type="text" value={movie.name} onChange={e=>setMovie({...movie,name:e.target.value})} /><br/>
            image url: <input type="text" value={movie.image} onChange={e=>setMovie({...movie,image:e.target.value})} /><br/>
            premiered: <input type="date" max={dateToString()} value={dateToString(movie.premiered)} onChange={e=>setMovie({...movie,premiered:e.target.value})} /><br/>
            genres:<MovieGenres setMovieGenres={setMovieGenres} movieGenres={movie.genres} />


                    <button onClick={updateMovie}>Update</button>
                
                
                <Errors errors={errors}/>
                


            </div>
        </div>
    )
}
