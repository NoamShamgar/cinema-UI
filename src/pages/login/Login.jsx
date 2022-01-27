import React, { useState } from 'react';
import {login} from "../../auth/auth";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux"
import { checkValidation } from '../../helpers/validation';
import Errors from '../../components/Errors';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../../styles/styles"
import { ButtonGroup } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

const useFormStyles = makeStyles(formStyles)

export default function Login() {
    
    const [email, setEmail] = useState("noam@gmail.com");
    const [password, setPassword] = useState("123456");
    const [errors, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useFormStyles();


    const attemptLogin = async () => {
        const errArr = checkValidation({email,password});
        if (errArr.length !== 0) {
            setError(errArr)
            return
        }

        try {
            let employee = await login(email,password);
            navigate("/main");
            dispatch({type:"LOGIN",payload:employee});

        } catch (err) {
            console.log(err.response.data);
                    setError(err.response.data);
                }
        }
    
    
    return (
       <Box className={classes.box}>
            <Typography variant="h3" component="h1" color="primary" gutterBottom> Login </Typography>
                <TextField 
                    size="small" 
                    type="text" 
                    label="Email" 
                    margin="normal"
                    color="secondary"
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
                    endIcon={<KeyIcon/>}
                    variant="contained"
                    onClick={attemptLogin}
                    >
                        Login</Button>
           
                <Button 
                    variant="contained"
                    color="secondary"
                    size="small"                     
                    onClick={()=>navigate("/setpass")}
                    >
                        First time
                    </Button>
                    </ButtonGroup>
                    <Errors errors={errors}/>

        </Box>
    )
}
