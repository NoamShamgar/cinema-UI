import React from 'react';
import dateToString from '../../helpers/dateToString';

//MUI
import Box from '@mui/system/Box';
import Button from "@mui/material/Button";
import { Typography } from '@mui/material';
import {useNavigate } from 'react-router-dom';


export default function MembersWatched(props) {
  const navigate = useNavigate();

  return <Box sx={{backgroundColor:"#ffffffcc",padding:"50px"}}>
        <Typography>Members watched {props.movieName}: </Typography>

      {props.MembersWatched.map((watchInstance,i) => 
             <div key ={i}>
             <Button onClick={()=>navigate(`/members/${watchInstance.member._id}`)}> {watchInstance.member.name} </Button> {dateToString(watchInstance.watchDate)} </div>
      )}
  </Box>;
}
