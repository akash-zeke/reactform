import React,{ useState, useEffect }from 'react'
// import {AgGridReact} from 'ag-grid-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


function Main(){
    
    const [rowData, setRowData] = useState([]);
    const [rowData2, setRowData2] = useState([]); //secondary state used to render
    const history = useHistory();

    const handleClick = () =>{
        history.push('/adduser');
    }
    const handleClick2 = () =>{
        history.push('/new');
    }

    useEffect(() => {
        getuser();
    }, []);

    const getuser = () =>{
        fetch('http://localhost:4000/users')
        .then(result => result.json())
        .then(res => {setRowData(res)
        setRowData2(res)})
    }
    
    const handleSearch = (event)=>{
        const searchdata = event.target.value;
        console.log(searchdata);
        var filterData = rowData;
        if(searchdata){
         //   console.log(rowData.filter(val =>{ return val.name.toLowerCase().includes(searchdata.toLowerCase())}))
            filterData = rowData.filter(val =>{ return val.name.toLowerCase().includes(searchdata.toLowerCase())})
            console.log(filterData)
        }
        // else{
        //     filterData = 
        // }
        setRowData2(filterData);
    }

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
    return(
      
        <div style={{padding:"50px"}}>
                <div className="ag-theme-alpine" style={{height:600, width:600}}>
                    {/* <AgGridReact
                        rowData={rowData} columnDefs={columns} defaultColDef={colDef}>
                    </AgGridReact> */}
                    <TextField id="Search" label="Search" variant="filled" onChange={handleSearch}/>
                    <Button style={{marginLeft:"10px"}} variant="contained" onClick={handleClick}>Add User+</Button>
                    <Button style={{marginLeft:"10px"}} variant="contained" onClick={handleClick2}>New Page</Button>
                    <table Border="1px" cellPadding="5px" style={{marginTop:"10px"}}>
                        <tr>
                            <td>Name</td><td>User Name</td><td>Email</td>
                        </tr>
                
                        {rowData2.map((obj,index)=>{ 
                            return <tr key={index}>
                                <td>{obj.name}</td>
                                <td>{obj.username}</td>
                                <td>{obj.email}</td>
                            </tr>
                        })}
                    </table>
                </div>
        </div>
    )

}

export default Main
