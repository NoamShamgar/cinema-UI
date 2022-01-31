import React, { useState } from 'react'
import {setPassToEmployee_UTIL} from "../../utils/employees"
import {useNavigate} from 'react-router-dom'
import Errors from '../../components/Errors';
import { checkValidation } from '../../helpers/validation';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../../styles/styles"
import { ButtonGroup } from '@mui/material';

const useFormStyles = makeStyles(formStyles)

export default function SetPass() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setError] = useState("");
    const navigate = useNavigate()
    const classes = useFormStyles()


    const setEmployeePassword = async () => {
        const errArr = checkValidation({email,password});
        if (errArr.length !== 0) {
            setError(errArr)
            return
        }
        
        try {
            await setPassToEmployee_UTIL(email,password);
            navigate("/");
        } catch (err) {
            setError(err);
        }
    }
    
    return ( <Box className={classes.box}>
            <Typography variant="h3" component="h1" color="primary" gutterBottom> Set Password </Typography>
            
            <TextField 
                    size="small" 
                    type="text" 
                    label="Email" 
                    color="secondary"
                    margin="normal"
                    required
                    fullWidth
                    value={email}
                    className={classes.input}
                    onChange={e=>setEmail(e.target.value)}
                    />

                <TextField 
                    size="small" 
                    type="password" 
                    color="secondary"
                    label="Password" 
                    margin="normal"
                    required
                    fullWidth
                    value={password}
                    className={classes.input}
                    onChange={e=>setPassword(e.target.value)}
                    />


                    <ButtonGroup
                        fullWidth
                    >
                <Button 
                    style={{width:"260%"}}
                    variant="contained"
                    onClick={setEmployeePassword}
                    >
                        Set a password</Button>
                <Button 
                    variant="outlined"
                    color="secondary"
                    size="small"                     
                    onClick={()=>navigate("/login")}
                    >
                        Back
                    </Button>
                    </ButtonGroup>    

            <Errors errors={errors}/>
        

        </Box>
    )
}
