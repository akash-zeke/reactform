import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root:{
       display:'grid',
       gridTemplateColumns:"140px auto"
    }
    });

function Mainlayout({children}) {
    const classes = useStyles();
    return (
        <div>
            <Navbar />
            <div className={classes.root}>
            <Sidebar />
            <main>{children}</main>
            </div>
        </div>
    )
}

export default Mainlayout
