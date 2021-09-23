import React,{useState, useEffect} from 'react';
import './Gridview.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Gridview() {
    const [rowData, setRowData] = useState([]);
    const [newstate,setnewstate] = useState("32%");
    const [prevstate,setprevstate] = useState(0);
    const history = useHistory();
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
        })
    }
    const handleEdit = (userid) =>{
        history.push(
            {pathname:`/edituser/`,
            state:{id:userid}}
            );
    }
    const handleDelete = (id)=>{
        if(window.confirm("Do you wish to edit this record?")){
            axios.delete(`http://localhost:4001/users/${id}`)
            .then(res=>{
                const newrowData = rowData.filter((user)=>{
                    return user.id !== id;
                }) 
                setRowData(newrowData); 
            })
        }  
    }
    const handleClick = (e)=>{        
        const val = ["49%","100%", "32%"]
        setnewstate(val[prevstate])
        if(prevstate===2)
        {
            setprevstate(0)
        }
        else
        {
            setprevstate(prevstate+1)
        }                
   }

    return (
        <div style={{minHeight:"100vh",padding:"15px"}}>
            <div style={{paddingBottom:"10px"}}>
                <h2 style={{display:"inline-block", marginRight:"12px"}}>Grid View</h2>
                <Button onClick={handleClick} variant="outline-primary" className="mb-3">Change View</Button>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
                {rowData.map((val, index)=>{
                    return <Card className="mb-4" key={index} style={{flexBasis:newstate}}>
                        <Card.Body>
                            <Card.Title>{val.name}</Card.Title>
                            <Card.Text>
                                User Name: {val.username} <br></br>
                                Email: {val.email}
                            </Card.Text>
                            <Button variant="primary" className='me-2'onClick={()=>{handleEdit(val.id)}}>Edit</Button>
                            <Button variant="primary" onClick={()=>{handleDelete(val.id)}}>Delete</Button>
                        </Card.Body>
                    </Card>
                })
                }
            </div>
        </div>
    )
}

export default Gridview
