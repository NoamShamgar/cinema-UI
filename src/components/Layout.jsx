import React from 'react'
import {logout} from '../auth/auth';
import { useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import checkPermissions from "../auth/checkperm"

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {layoutStyles} from "../styles/styles"
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { minHeight } from '@mui/system';


const uselayoutStyles = makeStyles(layoutStyles)

export default function Header(props) {
    const user = useSelector(state => state);
    const navigate = useNavigate();
    const classes = uselayoutStyles();
    const location = useLocation()


    return (<div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
            <AppBar position='sticky' style={{display:"flex",flexDirection:"column",margin:"20px 0"}}>
                <Toolbar>

            {Object.keys(user).length !== 0
            ?
                <div className={classes.flex}>
               <Box style={{flexGrow:"1"}}>
               <Typography >
                    LOGO
                    </Typography>


               </Box>
                <Box style={{flexGrow:"4"}}>
                    <ButtonGroup disableElevation >
                    {checkPermissions("view-sub")&&
                    <Button       
                        variant="text"
                        color="secondary"
                        onClick={()=>navigate("/members")}>
                        Subscriptions
                    </Button>}

                    {checkPermissions("view-mov")&&
                    <Button  
                        variant="text"
                        color="secondary"
                        onClick={()=>navigate("/movies")}>
                        Movies
                    </Button>}

                    {user.permissions.includes("sys-admin")&&
                    <Button  
                        variant="text"
                        color="secondary"
                        onClick={()=>navigate("/employees")}>
                        Employee Management
                    </Button>}
                    </ButtonGroup>

                </Box>


                <Box>
                    <Typography style={{display:"inline-block"}}>
                    Hello {user.fname} {user.lname}  
                        </Typography>

                    <IconButton onClick={props.changeTheme}>
                        <ColorLensIcon color="secondary"/>
                    </IconButton>

                    <Button 
                        color="secondary"
                        onClick={()=>{
                        logout();
                        navigate("login");
                        }}>
                        logout
                    </Button>

                </Box>

            </div>

            :<div className={classes.flex}>
                <div style={{flexGrow:1}}>
            <Button color="secondary" variant="contained"onClick={()=>{navigate("login")}}>Login</Button>
            </div>
                 <IconButton onClick={props.changeTheme}>
                        <ColorLensIcon color="secondary"/>
                    </IconButton>
            </div>
            }

   
      
            </Toolbar>

            {(location.pathname.includes("/movies") || location.pathname.includes("/members") || location.pathname.includes("/employees"))&&
            <Toolbar variant='dense' className={classes.themeSec}>
                 
                 <Box>
                    <Button onClick={()=>navigate(location.pathname+"/add")}>Add</Button>
                    <Button onClick={()=>navigate(location.pathname.split("/")[1])}>List</Button>
                </Box>

            </Toolbar>
            }
            </AppBar>

            <div style={{flexGrow:1}}>
            
            {props.children}
            </div>
      
                <Box sx={{
                    backgroundColor:"red",
                    textAlign:"center",
                    marginTop:5
                }}> 
                    footer
                </Box>



        </div>
    )
}