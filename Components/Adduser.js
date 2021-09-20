import { Button, TextField } from '@mui/material';
// import React,{ useState } from 'react';
import './Adduser.css';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

const initialValues = {
    name : '',
    username : '',
    email :''
}

const validate = values=>{
    let errors={}

    if(!values.name){
        errors.name = 'Required';
    }
    else if(!/^[A-Za-z]+$/i.test(values.name)){
        errors.name = 'Enter only Alphabets';
    }
    if(!values.username){
        errors.username = 'Required';
    }
    if(!values.email){
        errors.email = 'Required';
    }/* /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/ */
    else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)){
        errors.email = 'Invalid Mail Format'
    }
    return errors
}

function Adduser() {
    const history = useHistory();
    const headers = {
        'content-type': 'application/json',
    };

    const onSubmit = values => {
        if (validate){
            axios.post('http://localhost:4000/users',values,{headers});
            console.log('val',formik.values);
            history.push('/')}
       
    }
    
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
    
    console.log('err',formik.errors)
    // const handlechange = (e)=>{
    //     const {name , value} = e.target;
    //     setUser({
    //         ...user,
    //         [name] : value
    //     })
    // }
    const cancelform = ()=>{
        history.push('/')
    }
    
    return (
        <div style={{height:"600px"}}>
            <div id="box">
                <form onSubmit={formik.handleSubmit}>
                    <p>
                        <TextField id="name" label="Name" name="name" variant="filled" 
                        onChange={formik.handleChange} value={formik.values.name} style={{width:"100%"}}/>
                        {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                    </p>
                    <p>
                        <TextField id="username" label="UserName" name="username" variant="filled" 
                        onChange={formik.handleChange} value={formik.values.username} style={{width:"100%"}} />
                        {formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}
                    </p>
                    <p>
                        <TextField id="email" label="Email" name="email" variant="filled" 
                        onChange={formik.handleChange} value={formik.values.email} style={{width:"100%"}} />
                        {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                    </p>
                    <p>     
                        <Button sx={{m:2}} type="submit" variant="contained">Submit</Button>
                        <Button sx={{m:2}} variant="contained" onClick={cancelform}>Cancel</Button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Adduser
