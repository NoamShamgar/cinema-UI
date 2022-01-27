import React from 'react';
import dateToString from '../../helpers/dateToString';

//MUI
import Box from '@mui/system/Box';
import Link from "@mui/material/Link";
import { Typography } from '@mui/material';


export default function MembersWatched(props) {


  return <Box sx={{backgroundColor:"#ffffffcc",padding:"50px"}}>
        <Typography>Members watched {props.movieName}: </Typography>

      {props.MembersWatched.map((watchInstance,i) => 
             <div key ={i}>
             <Link href={`/members/${watchInstance.member._id}`}> {watchInstance.member.name} </Link> {dateToString(watchInstance.watchDate)} </div>
      )}
  </Box>;
}
