import React from 'react'

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../styles/styles"
import { List, ListItem } from '@mui/material';

const useFormStyles = makeStyles(formStyles)

export default function Errors(props) {
    const classes = useFormStyles()

    return (
        <Box>
            <List dense={true}>
                
                {typeof props.errors == "string"?props.errors:props.errors.map((error,i) => 
                    <ListItem key={i} color="error">
                         <Typography color="error"> {error} </Typography>
            
                    </ListItem>)}
            </List>

        </Box>


    )
}
