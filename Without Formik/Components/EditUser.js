import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import './EditUser.css'


function EditUser() {
    const [userdata,setUserdata] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const [errors,setErrors] = useState({});

    useEffect(()=>{
        console.log('id',location.state.id);
        getuser(location.state.id);
    },[])
    
    const headers = {
        'content-type': 'application/json',
    };

    const getuser = (id) =>{
        axios.get(`http://localhost:4001/users/${id}`)
        .then(result => result.data)
        .then(res => {
            console.log(res)
            setUserdata(res)
        })
        console.log('userdata',userdata)
    }

    const validate = ()=>{
        let errors ={}
        let result =true
        if(!userdata.name.trim()){
            errors.name = "Required"
            result=false
        }else if(userdata.name.length<20){
            errors.name = "Minimum 20 Characters"
            result=false
        }
        if(!userdata.username.trim()){
            errors.username= "Required"
            result=false
        }else if(userdata.username.length<20){
            errors.username = "Minimum 20 Characters"
            result=false
        }

        if(!userdata.email.trim()){
            errors.email="Required"
            result=false
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(userdata.email)){
            errors.email = "Invalid Email"
            result=false
        }else if(userdata.email.length<25){
            errors.email = "Minimum 25 Characters"
            result=false
        }
        setErrors(errors)
        return result
    }
    const updateUser = (id) => {
        axios.put(`http://localhost:4001/users/${id}`,userdata,{headers})
        .then((res)=> history.push('/'));
        
    }
    const handleSubmit = (e)=> {
       e.preventDefault();
         if(validate()){
            updateUser(location.state.id);
         }               
    }
    const cancelform = ()=>{
        history.push('/')
    }
    const handlechange = (e)=>{
        const {name , value} = e.target;
        if(name==="name"){
            let newval = value.replace(/[\d]/g,"");
            console.log(newval)
            setUserdata({
                ...userdata,
                [name] : newval
            })
        }
        else{
            setUserdata({
                ...userdata,
                [name] : value
            })
        }
        console.log(userdata)
    }
    return (

        <div style={{minHeight:'100vh'}}>
            <div className="margin">
                <h2>Edit User</h2>
                <Breadcrumbs>
                    <Link underline="hover" color="inherit" href="/">
                        User Grid
                    </Link>
                    <Typography color="text.primary">Edit User</Typography>
                </Breadcrumbs> 
            </div>
            <div className="margin">
                <p>
                    <TextField  id="name" label="Name" value={userdata.name  || ''}  name="name"
                    onChange={handlechange} ></TextField>
                    {errors.name ? <div className="error">{errors.name}</div> : null}
                </p>
                <p>
                    <TextField  id="username" label="User Name" value={userdata.username || ''} name="username"
                    onChange={handlechange} ></TextField>
                    {errors.username ? <div className="error">{errors.username}</div> : null}
                </p>
                <p>
                    <TextField  id="email" label="Email" value={userdata.email || ''} name="email"
                    onChange={handlechange}></TextField>
                    {errors.email ? <div className="error">{errors.email}</div> : null}
                </p>
                <Button sx={{m:1}} variant="contained" onClick={handleSubmit}>Submit</Button>
                <Button sx={{m:1}} variant="contained" onClick={cancelform}>Cancel</Button>
            </div>
        </div>
    )
}

export default EditUser

