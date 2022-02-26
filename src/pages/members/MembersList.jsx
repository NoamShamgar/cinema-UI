import React,  { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { getAllMembers_UTIL } from '../../utils/members';
import Member from './Member';
import checkPermissions from '../../auth/checkperm';

//MUI
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



export default function MembersList() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();


    useEffect(() => { // authorizaion
        !checkPermissions("view-sub") && navigate("/permdenied")
    }, []);

    // calling the fetch method on mount
    useEffect(() => {
       fetchMembers();         
       setLoading(false)
    }, []);

    // fetching members and setting in state
    const fetchMembers = async () => {
        try{
            setMembers(await getAllMembers_UTIL());
       } catch (err) {
           console.log(err);
       }
    }

  
    return (
        <div>
            {loading&&<CircularProgress sx={{display:"block",margin:"auto",width:"50%"}} disableShrink color="primary" />}
            <Grid container spacing={2}>
            {
             members.map((member,i) => 
                        <Grid item key={i} width={0.5} >
                            <Member 
                                        member={member}
                                        fetchMembers={fetchMembers} />
                         </Grid>
                )
            }
            </Grid>
        </div>
    )
}
