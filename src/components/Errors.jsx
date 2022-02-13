import React, { useState } from 'react'

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { List, ListItem } from '@mui/material';
import { useEffect } from 'react';

// getting errors and displaying them
export default function Errors({errors}) {
        const [errorState, setErrorState] = useState([]);


        useEffect(() => {
                if(errors.response?.data){ // axios error
                    setErrorState(errors.response?.data);
                } else if (errors?.code == 11000) { // mongoose duplicate error, can only occur due email duplicate
                    setErrorState("Email already exist");
                } else { // error came from props / client side errors
                    setErrorState(errors)
                }
                 console.clear() // clearing errors from console (after displaying them in the UI)
        }, [errors]);
        
    
    return (
        <Box>
            {typeof errorState === "string"?<Typography color="error"> {errorState} </Typography> // if error state its a string, write it
            :// if error state its an array, load a list
            <List dense={true}>
                
                {errorState.map((error,i) => 
                    <ListItem key={i} color="error">
                         <Typography color="error"> {error} </Typography>
            
                    </ListItem>)}
            </List>
            
        }
        </Box>


    )
}
