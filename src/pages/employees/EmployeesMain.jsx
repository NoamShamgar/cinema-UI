import React,{ useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import checkPermissions from '../../auth/checkperm';

export default function EmployeesMain() {
    const navigate =    useNavigate()
    
    useEffect(() => {
        !checkPermissions("sys-admin") && navigate("/permdenied")
    }, []);

    return (
        <div>
            <h1>user management</h1>
        <Link to="add">add employee</Link>
        <Link to="list">employees list</Link>
        <Outlet/>

        </div>
    )
}
