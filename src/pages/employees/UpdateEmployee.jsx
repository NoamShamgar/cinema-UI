import React from 'react'
import { useState } from 'react';
import  EmployeePermissions  from "./EmployeePermissions";
import { useEffect } from 'react';      
import { getEmployee_UTIL, updateEmployee_UTIL } from '../../utils/employees';
import Errors from '../../components/Errors';
import { checkValidation } from '../../helpers/validation';
import dateToString from "../../helpers/dateToString"

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../../styles/styles"

const useFormStyles = makeStyles(formStyles)


export default function UpdateEmployee(props) {
    const [uptEmployee, setUptEmployee] = useState({fname:"",lname:"",email:"",sessTimeout:5,permissions:[]});
    const [errors, setError] = useState("");
    const classes = useFormStyles();


    useEffect(() => {
        (async function callFetchData() {
            try{
                const fetchedEmployee = await getEmployee_UTIL(props.id);
                delete fetchedEmployee.ready;
                setUptEmployee(fetchedEmployee);
           } catch (err) {
               console.log(err);
           }
        })()
      
    }, [])

    useEffect(() => { // preventing from exceeding the limits in sessTimeOut
        if(uptEmployee.sessTimeout > 120){
            setUptEmployee({...uptEmployee,sessTimeout:120})
           }
        if(uptEmployee.sessTimeout < 5) {
            setUptEmployee({...uptEmployee,sessTimeout:5})
        }
    }, [uptEmployee.sessTimeout])


    const setPermissions = (newPermissions) => {
        setUptEmployee({...uptEmployee,permissions:newPermissions})
    }


    const updateEmployee = async () => {
        const errArr = checkValidation(uptEmployee);
        if (errArr.length !== 0) {
            setError(errArr)
            return
        }
        try {
            await updateEmployee_UTIL(props.id,uptEmployee);
            props.fetchEmployees();
            props.hideUpdateModal()
        } catch (err) {
            console.dir(err.response.data);
            setError(err)
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
                                Update Employee
                        </Typography>

                        <Typography 
                            variant="body1"
                            paddingBottom={2}
                            color="secondary"
                            color="secondary">
                               Created {dateToString(uptEmployee.created)}
                        </Typography>

                        

                        <TextField 
                            type="text" 
                            label="First name"
                            sx={{width:"50%"}}
                            className={classes.input} 
                            color="secondary"
                            size="small"
                            margin='dense'
                            value={uptEmployee.fname}  
                            onChange={e=>setUptEmployee({...uptEmployee,fname:e.target.value})} />

                        <TextField 
                            type="text" 
                            label="Last name"
                            sx={{width:"50%"}}
                            className={classes.input} 
                            color="secondary"
                            size="small"
                            margin='dense'
                            value={uptEmployee.lname} 
                            onChange={e=>setUptEmployee({...uptEmployee,lname:e.target.value})} />

                        <hr/>

                        <Box sx={{
                        display:"flex",
                    }}>
                                <Box sx={{textAlign:"left"}}>

                                    <TextField 
                                        type="text" 
                                        label="Email"
                                        
                                        className={classes.input} 
                                        color="secondary"
                                        size="small"
                                        margin='dense'
                                        value={uptEmployee.email}  
                                        onChange={e=>setUptEmployee({...uptEmployee,email:e.target.value})} />

                                    <TextField
                                        label="Session time"
                                        type="number" 
                                        
                                        className={classes.input} 
                                        color="secondary"
                                        size="small"
                                        margin='dense'
                                        value={uptEmployee.sessTimeout} min="5" max="120" onChange={e=>setUptEmployee({...uptEmployee,sessTimeout:e.target.value})} /><br/>
                                    
                                    
                            </Box>
                            <Box sx={{width:"70%"}}>
                                <EmployeePermissions setParentPermissionsState={setPermissions} parentPermissionsState={uptEmployee.permissions}/>
                                </Box>
                    
                    </Box>        
                            <Button onClick={updateEmployee}>Update</Button>
                        
                        <Errors errors={errors}/>
                        
                    </Box>

                   
            </div>
    )
}
