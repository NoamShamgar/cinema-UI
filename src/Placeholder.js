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
import "./styles/body.css"


// MUI
import { createTheme,ThemeProvider } from '@mui/material/styles';

const yellowBluetheme = createTheme({ // site first theme
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

const redTheme = createTheme({ // site second theme
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
    const [theme, setTheme] = useState(redTheme); // state to decide which theme to display
    const user = useSelector(state => state); // logged in user
    const dispatch = useDispatch();

    useEffect(() => { // if there is exist redux backup on session storage it means that the user has refreshed or like so, so it logging him in again.
        const savedReduxState = sessionStorage.getItem("redux-backup");
        if(savedReduxState) {
            dispatch({type:"LOGIN",payload:JSON.parse(savedReduxState)});
        }
        changeTheme("",true) // getting the theme stay as he is if there is a backup in session-storage

    }, []);

    setInterval(() => { // if the use is logged in the client will check to his session once a minute (for auto logout)
        Object.keys(user).length !== 0 && checkSession_DAL() 
    }, 60000);
    
    const changeTheme = (e,refreshed=false) => { // changing theme (on button click or refresh with saved theme)
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
        sessionStorage.setItem("theme",theme === redTheme?"redTheme":"yellowBluetheme"); // backing theme in session storage
    },[theme])



    return (
        <div>
     
                <ThemeProvider theme={theme}> {/* providing theme to components */}
            <Layout changeTheme={changeTheme}> {/* layout comp, sending [changeTheme] function, will execute on button click */}
            <Routes>
                {/* logged in routes */}
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

                 {/* logged out routes */}
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
