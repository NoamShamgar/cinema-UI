import React,  { useState,useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllEmployees_UTIL,deleteEmployee_UTIL } from '../../utils/employees';
import Employee from './Employee';
import checkPermissions from '../../auth/checkperm';

export default function EmployeesList() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        !checkPermissions("sys-admin") && navigate("/permdenied")
    }, []);


    // calling the fetch method on mount
    useEffect(() => {
            fetchEmployees();
    },[]);

    // fetching employees and setting in state
    const fetchEmployees = async () => {
        try{
            setEmployees(await getAllEmployees_UTIL());
       } catch (err) {
           console.log(err);
       }
    }

    const deleteEmployee = async (id) => {
       try{
            await deleteEmployee_UTIL(id);
            await fetchEmployees();
       } catch (err){
           console.log(err);
       }
    }

    return (
        <div>
            {employees.map((employee,i) => 
        <Employee key={i} employee={employee} 
                          deleteEmployee={deleteEmployee}
                          fetchEmployees={fetchEmployees}
                          />)}
            <Outlet/>
        </div>
    )
}
