import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { getMember_UTIL, updateMember_UTIL } from '../../utils/members';
import Errors from '../../components/Errors';
import { checkValidation } from '../../helpers/validation';

//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../../styles/styles"

const useFormStyles = makeStyles(formStyles)


export default function UpdateMember(props) {
    const [member, setMember] = useState({name:"",email:"",city:""});
    const [errors, setError] = useState("");
    const classes = useFormStyles();


    useEffect(() => {
        (async function callFetchData() {
            try{
                const fetchedMember = await getMember_UTIL(props.id);
                delete fetchedMember.ready;
                setMember(fetchedMember);
           } catch (err) {
               console.log(err);
           }
        })()
    }, [])

    const updateMember = async () => {
        const errArr = checkValidation(member);
        if (errArr.length !== 0) {
            setError(errArr)
            return
        }
        try {
            await updateMember_UTIL(props.id,member);
            props.fetchMembers();
            props.hideUpdateModal();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            
            <div className={classes.updateBG} onClick={props.hideUpdateModal}></div>

            <Box className={`${classes.box} ${classes.fixedBox}`}>
            <Typography 
                            variant="h3" 
                            color="secondary"
                            component="h1" 
                            color="primary">
                                Update Member
                        </Typography>
           
            <TextField 
                type="text" 
                value={member.name} 
                label="Name"
                className={classes.input} 
                color="secondary"
                size="small"
                margin='dense'
                onChange={e=>setMember({...member,name:e.target.value})} /><br/>
            <TextField 
                type="text" 
                value={member.email} 
                label="Email" 
                className={classes.input} 
                color="secondary"
                size="small"
                margin='dense'
                onChange={e=>setMember({...member,email:e.target.value})} /><br/>
            <TextField 
                type="text" 
                value={member.city} 
                label="City" 
                className={classes.input} 
                color="secondary"
                size="small"
                margin='dense'
                onChange={e=>setMember({...member,city:e.target.value})} /><br/>

            <Button onClick={updateMember}>Update</Button>
                
                
                <Errors errors={errors}/>
                


            </Box>
        </div>
    )
}
