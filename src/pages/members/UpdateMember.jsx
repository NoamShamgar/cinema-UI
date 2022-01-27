import React from 'react'
import { useState } from 'react';
import "../../styles/modal.css"
import { useEffect } from 'react';
import { getMember_UTIL, updateMember_UTIL } from '../../utils/members';
import Errors from '../../components/Errors';
import { checkValidation } from '../../helpers/validation';


export default function UpdateMember(props) {
    const [member, setMember] = useState({name:"",email:"",city:""});
    const [errors, setError] = useState("");


    useEffect(() => {
        (async function callFetchData() {
            try{
                const fetchedMember = await getMember_UTIL(props.id);
                delete fetchedMember.ready;
                setMember(fetchedMember);
           } catch (err) {
               console.log(err);
           }
        })()
    }, [])

    const updateMember = async () => {
        const errArr = checkValidation(member);
        if (errArr.length !== 0) {
            setError(errArr)
            return
        }
        try {
            await updateMember_UTIL(props.id,member);
            props.fetchMembers();
            props.hideUpdateModal();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            
            <div className='background' onClick={props.hideUpdateModal}></div>

            <div className='contentContainer'>
            <h1>update member</h1>
           
            Name: <input type="text" value={member.name} placeholder="Name" onChange={e=>setMember({...member,name:e.target.value})} /><br/>
            Email: <input type="text" value={member.email} placeholder="Email" onChange={e=>setMember({...member,email:e.target.value})} /><br/>
            City: <input type="text" value={member.city} placeholder="City" onChange={e=>setMember({...member,city:e.target.value})} /><br/>

            <button onClick={updateMember}>Update</button>
                
                
                <Errors errors={errors}/>
                


            </div>
        </div>
    )
}
