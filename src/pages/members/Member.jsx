import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import checkPermissions from '../../auth/checkperm';
import { getMember_UTIL,deleteMember_UTIL } from '../../utils/members';
import MoviesWatched from './MoviesWatched';
import UpdateMember from "./UpdateMember"

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



export default function Member(props) {
    const params = useParams();
    const navigate = useNavigate()
    const [member, setMember] = useState({});
    const [showUpdate, setShowUpdate] = useState(false);

    
    useEffect(() => { // authorization
     !checkPermissions("view-sub") && navigate("/permdenied")
    }, []);
    


    useEffect(()=>{
        fetchMember();
    },[props,params])


    const fetchMember = async () => {
        // if the member came from the list, the prop should exist, if this is a single item - get the id from the url and fetch it
        setMember(props.member || await getMember_UTIL(params.id))
    }

    const deleteMember = async (id) => {
        try{
             await deleteMember_UTIL(id);
             if(props.fetchMembers){
                props.fetchMembers();
             } else {
                navigate("/members")
             }
        } catch (err){
            console.log(err);
        }
     }

    return <Box style={{display:"flex",justifyContent:"space-around",border:"solid",padding:10}}>
                    <Box>
                            <Typography variant="h5" component="h1">{member.name}</Typography>
                            <Typography variant="body1"> Email: {member.email}</Typography>
                            <Typography variant="body1">city: {member.city}</Typography>
                    
                            
                            {checkPermissions("upt-sub")&&<Button onClick={()=>{setShowUpdate(true)}}>Edit</Button>}
                            {checkPermissions("del-sub")&&<Button onClick={()=>deleteMember(member._id)}>Delete</Button>}
                    </Box>
                    <Box>
                    {/* if the component has no props (didnt rendered on list), only show member details, not subscriptions */}
                            {props.member&&<MoviesWatched memberId={member._id}
                                        subId={member?.subId}
                                        moviesWatched={member?.moviesWatched}
                                        fetchMembers={props.fetchMembers}
                                        />}
                    </Box>
                {showUpdate&&<UpdateMember id={member._id}
                                     fetchMembers={props.fetchMembers || fetchMember} // if its part of a list, fetch all members, if its single item, fetch only one, and from this component
                                     hideUpdateModal={() => {setShowUpdate(false)}}/>}
        </Box>
}
