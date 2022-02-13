import React, {useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import { checkValidation } from '../../helpers/validation';
import { addEmployee_UTIL } from '../../utils/employees';
import  EmployeePermissions  from "./EmployeePermissions";
import Errors from '../../components/Errors';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {formStyles} from "../../styles/styles"
import checkPermissions from '../../auth/checkperm';


const useFormStyles = makeStyles(formStyles)


export default function AddEmployee() {
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({fname:"",lname:"",email:"",sessTimeout:5,permissions:[]});
    const [errors, setError] = useState("");
    const classes = useFormStyles();

    useEffect(() => { // if its not sys-admin, navigate out this page
        !checkPermissions("sys-admin") && navigate("/permdenied")
    }, []);


    useEffect(() => { // preventing from exceeding the limits in sessTimeOut input
        if(employee.sessTimeout > 120){
            setEmployee({...employee,sessTimeout:120})
           }

        if(employee.sessTimeout < 5) {
            setEmployee({...employee,sessTimeout:5})
        }
    }, [employee.sessTimeout])
    

    const setPermissions = (newPermissions) => { // getting data from child component, setting in this comp state
        setEmployee({...employee,permissions:newPermissions});
    }


    const addEmployee = async () => {
        const errArr = checkValidation(employee); // checking validation
        if (errArr.length !== 0) { // if validation arr is not empty will set error and return
            setError(errArr)
            return
        }
        try{
            await addEmployee_UTIL(employee);
            navigate("/employees")
        } catch (err) {
            setError(err)
            console.log(err);
        }
    }

    const resetForm = ()=> {
        setEmployee({fname:"",lname:"",email:"",sessTimeout:5,permissions:[]})
        setError("");
    }


    

    return (
        <div>
            <Box className={classes.box}>
                <Typography 
                    variant="h3" 
                    color="secondary"
                    component="h1" 
                    color="primary">
                        Add Employee
                </Typography>

                <TextField 
                    sx={{width:"50%"}}
                    className={classes.input} 
                    color="secondary"
                    size="small"
                    margin='dense'
                    type="text"
                    value={employee.fname} 
                    label="First Name" 
                     onChange={e=>setEmployee({...employee,fname:e.target.value})} />

                <TextField 
                    sx={{width:"50%"}}
                    className={classes.input}
                    type="text" 
                    size="small"
                    margin='dense'
                    color="secondary"
                    value={employee.lname} 
                    label="Last Name" 
                    onChange={e=>setEmployee({...employee,lname:e.target.value})} /><br/>
                
                    <hr/>

                    <Box sx={{
                        display:"flex"
                    }}>
                        <Box sx={{textAlign:"left"}}>

                            <TextField 
                                className={classes.input}
                                type="text" 
                                size="small"
                                fullWidth
                                margin='dense'
                                color="secondary"
                                value={employee.email} 
                                label="Email" 
                                onChange={e=>setEmployee({...employee,email:e.target.value})} /><br/>

                            <TextField
                                className={classes.input} 
                                type="number" 
                                color="secondary"
                                fullWidth
                                size="small"
                                margin='dense'
                                value={employee.sessTimeout} 
                                label="Session time"
                                min="5" max="120" 
                                onChange={e=>setEmployee({...employee,sessTimeout:e.target.value})} /><br/>
                        </Box>
                        <Box paddingLeft={5}>
                            <EmployeePermissions setParentPermissionsState={setPermissions} parentPermissionsState={employee.permissions}/>

                            </Box>
                </Box>

                <Button type="reset" onClick={resetForm} > reset </Button>
                <Button onClick={addEmployee}>add employee</Button>
                <Errors errors={errors}/>
        </Box>
            </div>

    )
}
