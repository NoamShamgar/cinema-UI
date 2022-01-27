import React from 'react'
import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import checkPermissions from '../../auth/checkperm';

export default function MoviesMain() {

    const navigate =    useNavigate()
    
    useEffect(() => {
        !checkPermissions("view-mov") && navigate("/permdenied");
    }, []);

    return (
        <div>
            <h1>movies</h1>
        <Link to="add">Add Movie</Link>
        <Link to="list">Movies list</Link>


        <Outlet/>

        </div>
    )
}
