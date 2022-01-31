import React from 'react'
import {useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"


//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../../styles/styles"

const useFormStyles = makeStyles(formStyles)

export default function Permdenied() {
    const classes = useFormStyles();
    const navigate = useNavigate();
    const user = useSelector(state=>state)

    return (
        <Box className={classes.box}>
          <Typography>Permission Denied!</Typography> 
        <br/>
            <Button onClick={()=> navigate(Object.keys(user).length !== 0?"/main":"/login")}>Back to Safe spot</Button>
        </Box>
    )
}
