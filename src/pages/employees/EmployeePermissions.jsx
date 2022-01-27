import React from 'react'

//MUI
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {formStyles} from "../../styles/styles"
import { makeStyles } from '@mui/styles';


const useFormStyles = makeStyles(formStyles)

export default function EmployeePermissions(props) {
    const classes = useFormStyles();



    const handleCBChange = (e) => { // handling CB change
        let newPermissions;

        if (e.target.checked) { // checked
            if (e.target.value === "view-sub" || e.target.value === "view-mov") { // only check this checkbox
                newPermissions = [...props.parentPermissionsState,e.target.value];
            } else { // also check "view" of the same type                              (sub/mov)                                      
                newPermissions = [...props.parentPermissionsState,e.target.value,"view-" + e.target.value.split("-")[1]];
            }
            newPermissions.sort(); // sorting and remove duplicates
            newPermissions = newPermissions.filter((permission,i,newPermissions)=> permission !== newPermissions[i+1]);

        } else { // unchecked
            if (e.target.value === "view-sub") { // also uncheck all options to make an action on subs
                newPermissions = props.parentPermissionsState.filter(permission => permission.split("-")[1] !== "sub");
            } else if (e.target.value === "view-mov") { // also uncheck all options to make an action on movies
                newPermissions = props.parentPermissionsState.filter(permission => permission.split("-")[1] !== "mov");
            } else { // only uncheck this checkbox
                newPermissions = props.parentPermissionsState.filter(permission => permission !== e.target.value);
            }
        }
        props.setParentPermissionsState(newPermissions);

    }

    return (
        <Box >
            <FormGroup style={{textAlign:"left"}}>
                <Typography 
                    variant="h6"
                    color="secondary">Permissions</Typography>
      
                <FormControlLabel  control={<Checkbox color='secondary' />} label="View-Subscriptions" type="checkbox" value="view-sub" checked={props.parentPermissionsState.some(permission => permission === "view-sub")} onChange={e=>handleCBChange(e)} />
                <FormControlLabel sx={{margin:-1,marginLeft:2}} control={<Checkbox/>} label="Add-Subscriptions" value="add-sub" checked={props.parentPermissionsState.some(permission => permission === "add-sub")} onChange={e=>handleCBChange(e)} /> 
                <FormControlLabel sx={{margin:-1,marginLeft:2}} control={<Checkbox/>} label="Update-Subscriptions" value="upt-sub" checked={props.parentPermissionsState.some(permission => permission === "upt-sub")} onChange={e=>handleCBChange(e)} />
                <FormControlLabel sx={{margin:-1,marginLeft:2}} control={<Checkbox/>} label="Delete-Subscriptions" value="del-sub" checked={props.parentPermissionsState.some(permission => permission === "del-sub")} onChange={e=>handleCBChange(e)} />
                <FormControlLabel control={<Checkbox color='secondary'/>} label="View-Movie" value="view-mov" checked={props.parentPermissionsState.some(permission => permission === "view-mov")} onChange={e=>handleCBChange(e)} /> 
                <FormControlLabel sx={{margin:-1,marginLeft:2}} control={<Checkbox/>} label="Add-Movie" value="add-mov" checked={props.parentPermissionsState.some(permission => permission === "add-mov")} onChange={e=>handleCBChange(e)} /> 
                <FormControlLabel sx={{margin:-1,marginLeft:2}} control={<Checkbox/>} label="Update-Movie" value="upt-mov" checked={props.parentPermissionsState.some(permission => permission === "upt-mov")} onChange={e=>handleCBChange(e)} /> 
                <FormControlLabel sx={{margin:-1,marginLeft:2}} control={<Checkbox/>} label="Delete-Movie" value="del-mov" checked={props.parentPermissionsState.some(permission => permission === "del-mov")} onChange={e=>handleCBChange(e)} /> 
            </FormGroup> 





        </Box>
    )
}
