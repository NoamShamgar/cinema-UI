import React, { useEffect, useState } from 'react'
import {Routes,Route, Outlet} from "react-router-dom";
import Login from "./pages/login/Login";
import Layout from './components/Layout';
import SetPass from './pages/setPass/SetPass';
import Main from './pages/main/main';
import {useDispatch,useSelector} from "react-redux";
import Permdenied from './pages/permission denied/Permdenied';
import EmployeesList from './pages/employees/EmployeesList';
import AddEmployee from './pages/employees/AddEmployee';
import AddMovie from './pages/movies/AddMovie';
import MoviesList from './pages/movies/MoviesList';
import AddMember from './pages/members/AddMember';
import MembersList from './pages/members/MembersList';
import Member from './pages/members/Member';
import checkSession_DAL from './DAL/checkSession';


// MUI
import { createTheme,ThemeProvider } from '@mui/material/styles';

const yellowBluetheme = createTheme({
    typography:{
        fontFamily: 'Josefin Sans'
    },
    palette:{
        primary: {
            main:"#EEBA0B"
        },
        secondary:{
            main:"#247BA0"
        }
    }
})

const redTheme = createTheme({
    typography:{
        fontFamily: 'Josefin Sans'
    },
    palette:{
        primary: {
            main:"#BF1A2F"
        },
        secondary:{
            main:"#2D2A32"
        }
    }
})


export default function Placeholder() { 
    const [theme, setTheme] = useState(redTheme);
    const user = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => { // if there is exist redux backup on session storage it means that the user has refreshed or like so, so it logging him in again.
        const savedReduxState = sessionStorage.getItem("redux-backup");
        if(savedReduxState) {
            dispatch({type:"LOGIN",payload:JSON.parse(savedReduxState)});
        }
        changeTheme("",true) // getting the theme stay as he is if there is a backup in session-storage

    }, []);

    setInterval(() => {
        Object.keys(user).length !== 0 && checkSession_DAL() // if the use is logged in the client will check to his session once a minute (for auto logout)
    }, 60000);
    
    const changeTheme = (e,refreshed=false) => {   
        let savedTheme = sessionStorage.getItem("theme");
        if (refreshed){
            if(savedTheme === "yellowBluetheme") {
                setTheme(yellowBluetheme)
            } else {
                setTheme(redTheme)
            }
        } else {
            setTheme(theme === redTheme?yellowBluetheme:redTheme)
        }
    }

    useEffect(()=>{
        sessionStorage.setItem("theme",theme === redTheme?"redTheme":"yellowBluetheme"); // backing up in theme
    },[theme])



    return (
        <div>
     
                <ThemeProvider theme={theme}>
            <Layout changeTheme={changeTheme}>
            <Routes>
                {/* members routes */}
                <Route element={Object.keys(user).length !== 0?<Outlet/>:<Permdenied/>}>

                    <Route path="/main" element={<Main/>} />  
                    <Route path="/permdenied/*" element={<Permdenied/>} />
  

                    {/* employees routes */}
                    <Route path="/employees" element={<EmployeesList/>} />
                    <Route path="/employees/add" element={<AddEmployee />}/>

                    {/* movies routes */}
                    <Route path="/movies" element={<MoviesList/>} />
                    <Route path="/movies/add" element={<AddMovie />}/>

                        {/* subscriptions routes */}
                        <Route path="/members" element={<MembersList/>} />
                        <Route path="/members/add" element={<AddMember />}/>
                        <Route path="/members/:id" element={<Member />}/>
                </Route> 

                 {/* guests routes */}
                <Route element={Object.keys(user).length !== 0?<Permdenied/>:<Outlet/>}>
                    <Route path="/" element={<Login/>}  />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/setpass" element={<SetPass/>} />
                </Route>    
            </Routes>
                </Layout>
                </ThemeProvider>    
         


     
        </div>
    )
}
