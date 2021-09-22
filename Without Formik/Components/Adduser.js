import { Button, TextField } from '@mui/material';
import React,{ useState } from 'react';
import './Adduser.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


function Adduser(props) {
    const [user, setUser] = useState ({
        name:"",
        username:"",
        email:""
    })
    const [errors,setErrors] = useState({});
    
    const history = useHistory();
    const headers = {
        'content-type': 'application/json',
    };
    const validate = (user)=>{
        let errors ={}
        let result =true
        if(!user.name.trim()){
            errors.name = "Required"
            result=false
        }else if(user.name.length<20){
            errors.name = "Minimum 20 Characters"
            result=false
        }
        if(!user.username.trim()){
            errors.username= "Required"
            result=false
        }else if(user.username.length<20){
            errors.username = "Minimum 20 Characters"
            result=false
        }

        if(!user.email.trim()){
            errors.email="Required"
            result=false
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(user.email)){
            errors.email = "Invalid Email"
            result=false
        }else if(user.email.length<25){
            errors.email = "Minimum 25 Characters"
            result=false
        }
           
        setErrors(errors)
        return result
    }
    const handleSubmit = (e)=> {
        e.preventDefault();
        if(validate(user)){
            axios.post('http://localhost:4001/users',user,{headers})
            .then((res)=>{history.push('/')})
        }             
    }
    
    const handlechange = (e)=>{
        const {name , value} = e.target;
        if(name==="name"){
            let newval = value.replace(/[\d]/g,"");
            console.log(newval)
            setUser({
                ...user,
                [name] : newval
            })
        }
        else{
            setUser({
                ...user,
                [name] : value
            })
        }
        console.log(user)
    }
    const cancelform = ()=>{
        history.push('/')
    }
    return (
        <div style={{minHeight:'100vh'}}>
        <div className="heading">
            <h2>Add User</h2>
            <Breadcrumbs>
                <Link underline="hover" color="inherit" href="/">
                    User Grid
                </Link>
                <Typography color="text.primary">Add User</Typography>
            </Breadcrumbs>
        </div>
        <div>
            <div id="box">
                <form onSubmit={handleSubmit}>
                    <p>
                        <TextField id="name" label="Name" name="name" variant="outlined" maxLength={100}
                        onChange={handlechange} value={user.name} style={{width:"90%"}} />
                        {errors.name ? <div className="error">{errors.name}</div> : null}
                    </p>
                    <p>
                        <TextField id="username" label="UserName" name="username" variant="outlined" maxLength={100}
                        onChange={handlechange} value={user.username} style={{width:"90%"}} />
                        {errors.username ? <div className="error">{errors.username}</div> : null}
                    </p>
                    <p>
                        <TextField id="email" label="Email" name="email" variant="outlined" maxLength={100}
                        onChange={handlechange} value={user.email} style={{width:"90%"}} />
                        {errors.email ? <div className="error">{errors.email}</div> : null}
                    </p>
                    <p>     
                        <Button sx={{m:2}} type="submit" variant="contained">Submit</Button>
                        <Button sx={{m:2}} variant="contained" onClick={cancelform}>Cancel</Button>
                    </p>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Adduser
