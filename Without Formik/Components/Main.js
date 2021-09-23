import React,{ useState, useEffect }from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';

function Main(){
    
    const [rowData, setRowData] = useState([]);
    const [rowData2, setRowData2] = useState([]); //secondary state used to render
    const history = useHistory();

    const handleClick = () =>{
        history.push('/adduser');
    }

    useEffect(() => {
        getuser();
    }, []);

    const getuser = () =>{
        fetch('http://localhost:4001/users')
        .then(result => result.json())
        .then(res => {
            const sorted = res.sort((a, b)=>{ return a.name.toLowerCase() > b.name.toLowerCase()?1:-1 })
            console.log('sorted data',sorted);
            setRowData(sorted)
            setRowData2(sorted)
        })
    }
    
    const handleSearch = (event)=>{
        const searchdata = event.target.value;
        console.log(searchdata);
        var filterData = rowData;
        
        if(searchdata){
            filterData = rowData.filter(val =>{ return val.name.toLowerCase().includes(searchdata.toLowerCase())})
            console.log('fildata',filterData.length)
        }
        setRowData2(filterData);      
    }
    const handleEdit = (userid) =>{
        history.push(
            {pathname:`/edituser/`,
            state:{id:userid}}
            );
    }
    const handleDelete = (id)=>{
        if(window.confirm("Do you wish to edit this record?")){
            axios.delete(`http://localhost:4001/users/${id}`).then(res=>{
                const newrowData = rowData2.filter((user)=>{
                    return user.id !== id;
                }) 
                setRowData2(newrowData); 
            })
        }  
    }
    return(
        <div style={{padding:"20px 50px"}}>
                <div style={{Width:"80%"}}>
                    <div style={{width:"100%",textAlign:'left',marginBottom:'15px'}}>
                        <h2>User Grid</h2>
                    </div>
                    <div style={{width:"50%",float:"left",textAlign:'left'}}>
                        <TextField sx={{mb:1}} id="Search" label="Search" variant="outlined" onChange={handleSearch} size="small"/>
                    </div>
                    <div style={{width:"50%",float:"right",textAlign:"right"}}>
                        <Button sx={{mb:1}} style={{marginLeft:"10px"}} variant="contained" onClick={handleClick}>Add User+</Button>
                    </div>
                    
                    <Table striped bordered hover /* BorderColor="#1976d2" Width="100%" Border="1px" cellPadding="5px" */ style={{marginTop:"10px",textAlign:"center"}}>
                        <thead><tr>
                            <td>Name</td><td>User Name</td><td>Email</td><td>Action</td>
                        </tr></thead>
                
                        {rowData2.length !== 0 ?  rowData2.map((obj,index)=>{ 
                            return <tbody><tr key={index}>
                                <td>{obj.name}</td>
                                <td>{obj.username}</td>
                                <td>{obj.email}</td>
                                <td style={{display:"flex",justifyContent:"center"}}><Button sx={{mx:1}} 
                                onClick={()=>{handleEdit(obj.id)}} variant="contained">Edit</Button>
                                <Button sx={{mx:1}} variant="contained" onClick={()=>{handleDelete(obj.id)}}>Delete</Button></td>
                            </tr></tbody>
                            }) : <tr>
                                <td colSpan="4">
                                <p style={{textAlign:"center",fontWeight:"bold",fontStyle:'italic'}}>-- No Data found --</p>
                                </td>
                            </tr>
                        }
                    </Table>
                </div>
        </div>
    )

}

export default Main

// import {AgGridReact} from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// const columns = [
    //     {
    //         headerName:"Name", field:"name",
    //     },
    //     {
    //          headerName:"User Name", field:"username",
    //     },
    //     {
    //          headerName:"Email", field:"email",
    //     }
    // ]
    // const colDef ={
    //      sortable:true,
    //      filter:true,
    //      resizable:true
    // }
    {/* <AgGridReact
                        rowData={rowData} columnDefs={columns} defaultColDef={colDef}>
                    </AgGridReact> */}