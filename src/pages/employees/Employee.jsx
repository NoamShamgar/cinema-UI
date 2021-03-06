import React, { useState } from 'react';
import UpdateEmployee from "./UpdateEmployee"
import { deleteEmployee_UTIL } from '../../utils/employees';


//MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import { Box } from '@mui/system';


export default function Employee(props) {
  const [showUpdate, setShowUpdate] = useState(false); // whether to show update comp or not

  const deleteEmployee = async (id) => {
    try{
         await deleteEmployee_UTIL(id);
         await props.fetchEmployees();
    } catch (err){
        console.log(err);
    }
 }


    return <div style={{padding:"0 20%"}}>
            <div>   
                    <Accordion>
                    <AccordionSummary
                    > 
                        <Box style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
                                <Box  style={{display:"flex"}}>
                                    <Typography>{props.employee.fname} {props.employee.lname}</Typography>
                                    <ExpandMoreIcon />
                                </Box>
                                
                                <Box>
                                {props.employee.permissions.includes("sys-admin")?null:<div>
                                    <Button onClick={(e)=>{ e.stopPropagation(); setShowUpdate(true)}}>Edit</Button> {/*stopPropagation is to prevent accordion to fold/unfold on edit*/}
                                    <Button onClick={(e)=>{e.stopPropagation(); deleteEmployee(props.employee._id)}}>Delete</Button>
                                    </div>}
                                </Box>
                        </Box>


                    </AccordionSummary>
                    <AccordionDetails>
                    <Box style={{display:"flex",justifyContent:"space-evenly"}}>
                                <Box>
                                        <Typography>
                                                Email: {props.employee.email}<br/>
                                                Session timeout: {props.employee.sessTimeout}<br/>
                                                created: {props.employee.created.replaceAll("-","/").slice(0,10)}
                                        </Typography>
                                  
                                </Box>
                                
                                <Box>
                                            <Typography>
                                                    Permissions:
                                            </Typography>

                                            <ul>
                                                {props.employee.permissions.map((permission,i)=><li key={i}> <Typography>{permission}</Typography></li>)}
                                            </ul>
                                </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
     
               
          </div>



        {showUpdate?<UpdateEmployee id={props.employee._id} // displaying updateEmployee comp 
                                    fetchEmployees={props.fetchEmployees} 
                                    hideUpdateModal={() => {setShowUpdate(false)}}/>
        :null}


    </div>;
}
