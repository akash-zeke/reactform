import React,{useEffect} from 'react';
import { Box, List, ListItemButton,ListItemText, ListItem  } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
root:{
    border:"1px solid #2196f3",
    backgroundColor:"#1976d2",
    color:"white"
},
active:{
    backgroundColor:"#2196f3",
    color:"white"
},
def:{
    color:"white"
}
});

function Sidebar() {
    useEffect(() => {
        console.log(typeof location.pathname,location.pathname)
    }, [])

    const classes = useStyles();
    const location = useLocation();
    return (
        <div className={classes.root}>
            <Box>
                <List>
                    <ListItem className={location.pathname === "/" ? classes.active : classes.def} component={Link} to="/" >
                        <ListItemText primary="Table View" />
                    </ListItem>
                    <ListItemButton className={location.pathname === "/grid" ? classes.active : classes.def} component={Link} to="/grid">
                        <ListItemText primary="Grid View" />
                    </ListItemButton>
                </List>
           </Box>
        </div>
    )
}

export default Sidebar
