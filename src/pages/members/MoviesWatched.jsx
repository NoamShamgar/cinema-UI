import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkPermissions from '../../auth/checkperm';
import dateToString from '../../helpers/dateToString';
import AddMovieToMember from './AddMovieToMember';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Popover from '@mui/material/Popover';


export default function MoviesWatched(props) {
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const navigate = useNavigate();

    // closing [addsub] component
    const closeAddSub = () => {
        setPopoverAnchor(null);
    }
    
    const open = Boolean(popoverAnchor);

    return <div>
                <div>
                    {/* {checkPermissions("add-sub")&& <Button size='small' variant='contained' onClick={()=>setShowAddMovie(!showAddMovie)}>add movie to subscription</Button>} */}
                    {checkPermissions("add-sub")&&
                    <Button 
                        size='small' 
                        variant='contained'
                        onClick={(e)=>{
                                setPopoverAnchor(e.target)
                                }}>add movie to subscription</Button>}
                    

                    <Popover
                        open={open}
                        anchorEl={popoverAnchor}
                        onClose={()=>setPopoverAnchor(null)}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}>
                              
                            <Box sx={{width:"70vh"}}>
                                <AddMovieToMember 
                                        watchedMovies={props.moviesWatched?.map(watchInstance => watchInstance.movie) || []} // return array of movies, without the watchdate      
                                        subId={props?.subId}
                                        memberId={props.memberId}
                                        fetchMembers={props.fetchMembers}
                                        closeAddSub={closeAddSub}
                                        />
                            </Box>

                    </Popover>
                    
                    
                    <Box sx={{maxHeight:"200px",overflowY:"scroll"}}>
                    {props.moviesWatched?.map((watchInstance,i) => 
                            <Box style={{display:"flex",alignItems:"center"}} key ={i}> 
                            <Typography variant="h6" component="h2">{watchInstance.movie.name} </Typography>
                            <IconButton onClick={()=>navigate(`/movies?search=${watchInstance.movie.name}`)}>
                                     <DoubleArrowIcon  />
                            </IconButton>
                            <Typography variant="body1">{dateToString(watchInstance.watchDate)} </Typography>


                            </Box> 
                    )}
                    </Box>
                </div>



        </div>;
}
