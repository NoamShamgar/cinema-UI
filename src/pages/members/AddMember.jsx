import React, {useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import { checkValidation } from '../../helpers/validation';
import { addMember_UTIL } from '../../utils/members';
import Errors from '../../components/Errors';
import checkPermissions from '../../auth/checkperm';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../../styles/styles"

const useFormStyles = makeStyles(formStyles)

export default function AddMember() {
    const navigate = useNavigate()
    const [member, setMember] = useState({name:"",email:"",city:""});
    const [errors, setError] = useState("");
    const classes = useFormStyles()
    
    // calling the fetch method on mount
    useEffect(() => {
        !checkPermissions("add-sub") && navigate("/permdenied")
    }, []);

    useEffect(() => { // preventing from exceeding the limits in sessTimeOut
        if(member.sessTimeout > 120){
            setMember({...member,sessTimeout:120})
           }

        if(member.sessTimeout < 5) {
            setMember({...member,sessTimeout:5})
        }
    }, [member.sessTimeout])


    const addMember = async () => {
        const errArr = checkValidation(member);
        if (errArr.length !== 0) {
            setError(errArr)
            return
        }
        try{
            await addMember_UTIL(member);
            navigate("/members")
        } catch (err) {
            console.log(err);
        }
    }

    const resetForm = ()=> {
        setMember({name:"",email:"",city:""})
        setError("");
    }


    

    return (
        <Box className={classes.box}>

            
<Typography 
                    variant="h3" 
                    color="secondary"
                    component="h1" 
                    color="primary">
                        Add Member
                </Typography>


            <TextField 
                type="text" value={member.name} 
                label="Name"
                  color="secondary"
                size="small"
                margin='dense'
                fullWidth
                onChange={e=>setMember({...member,name:e.target.value})} /><br/>
            <TextField 
                type="text" value={member.email} 
                label="Email" 
                  color="secondary"
                size="small"
                margin='dense'
                fullWidth
                onChange={e=>setMember({...member,email:e.target.value})} /><br/>
            <TextField 
                type="text" value={member.city} 
                label="City"
                  color="secondary"
                size="small"
                margin='dense'
                fullWidth
                onChange={e=>setMember({...member,city:e.target.value})} /><br/>

                <Button type="reset" onClick={resetForm} > reset </Button>
                <Button onClick={addMember}>add member</Button>
            <Errors errors={errors}/>

            </Box>

    )
}
