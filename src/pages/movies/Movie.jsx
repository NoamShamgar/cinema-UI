import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import checkPermissions from '../../auth/checkperm';
import { deleteMovie_UTIL } from '../../utils/movies';
import MembersWatched from './MembersWatched';
import UpdateMovie from "./UpdateMovie"

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {gridItemStyles} from "../../styles/styles"
import { Fade } from '@mui/material';
import Popover from '@mui/material/Popover';


const useGridItemStyles = makeStyles(gridItemStyles)


export default function Movie(props) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const classes = useGridItemStyles();
  const [popoverAnchor, setPopoverAnchor] = useState(null);


  useEffect(() => {
    setShowUpdate(false)
  }, [props]);
  

  const deleteMovie = async (id) => {
    try{
         await deleteMovie_UTIL(id);
         props.fetchMovies();
    } catch (err){
        console.log(err);
    }
 }

 const open = Boolean(popoverAnchor);

    return <Box className={classes.container}>
                    <img src={props.movie.image} alt="" onMouseEnter={()=>setShowDetails(true)} /> 

                      <Fade in={showDetails} className={classes.details} onMouseLeave={()=>setShowDetails(false)}>
                          <Box sx={{
                             display:"flex",
                             flexDirection:"column",
                             justifyContent:"space-between",
                          }}>

                                <Box>
                                      <Typography variant="h4" component="h1">{props.movie.name}</Typography> 
                                      <Typography variant="body1" component="p">{props.movie.premiered.replaceAll("-","/").slice(0,10)} </Typography> 
                                </Box>  
                  
                                <Box sx={{display:"flex"}}>
                                     {props.movie.genres.map((genre,i)=><Typography key={i}>{genre}</Typography>)}
                                </Box>

                                <Box>
                                      {props.movie.membersWatched&&<Button
                                                            size='small' 
                                                            variant='contained'
                                                            onClick={(e)=>{
                                                            setPopoverAnchor(e.target)
                                                             }}>See members subscribed</Button>}
                                </Box>


                                <Box>
                                      {checkPermissions("upt-mov")&&<Button color="secondary" onClick={()=>{setShowUpdate(true)}}>Edit</Button>}
                                      {checkPermissions("del-mov")&&<Button color="secondary" onClick={()=>{deleteMovie(props.movie._id)}}>Delete</Button>}
                                </Box>
                           </Box>
                      </Fade>



                  {showUpdate&&<UpdateMovie id={props.movie._id} 
                                          fetchMovies={props.fetchMovies} 
                                          hideUpdateModal={() => {setShowUpdate(false)}}
                                          />}

                                    <Popover
                                          open={open}
                                          anchorEl={popoverAnchor}
                                          onClose={()=>setPopoverAnchor(null)}
                                          anchorOrigin={{
                                          vertical: 'center',
                                          horizontal: 'center',
                                          }}
                                          transformOrigin={{
                                              vertical: 'center',
                                              horizontal: 'center',
                                            }}
                                          >
                                           <MembersWatched movieName={props.movie.name} MembersWatched={props.movie.membersWatched} /> {/* if no one watched it, the key won't appear */}
                                      </Popover>


    </Box>
}
  
  
  
  
  
  
  

