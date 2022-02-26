import React,  { useState,useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllEmployees_UTIL } from '../../utils/employees';
import Employee from './Employee';
import checkPermissions from '../../auth/checkperm';
import CircularProgress from '@mui/material/CircularProgress';


export default function EmployeesList() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { // authorization
        !checkPermissions("sys-admin") && navigate("/permdenied")
    }, []);


    // calling the fetch method on mount
    useEffect(() => {
        fetchEmployees();
        setLoading(false)
    },[]);

    // fetching employees and setting in state
    const fetchEmployees = async () => {
        try{
            setEmployees(await getAllEmployees_UTIL());
       } catch (err) {
           console.log(err);
       }
    }

    

    return (
        <div>
            {loading&&<CircularProgress sx={{display:"block",margin:"auto",width:"50%"}} disableShrink color="primary" />}
            
            {employees.map((employee,i) => 
        <Employee key={i} employee={employee} 
                          fetchEmployees={fetchEmployees}
                          />)}
            <Outlet/>
        </div>
    )
}
