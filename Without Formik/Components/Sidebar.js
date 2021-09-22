import React from 'react';
import { Box, /*List, ListItemButton,ListItemText */ } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
root:{
    border:"1px solid #2196f3",
    backgroundColor:"#1976d2",
    color:"white"
}
});

function Sidebar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Box>
                <p>
                    Side Bar
                </p>
                {/* <List>
                    <ListItemButton>
                        <ListItemText primary="Side Bar" />
                    </ListItemButton>
                </List> */}
           </Box>
        </div>
    )
}

export default Sidebar
