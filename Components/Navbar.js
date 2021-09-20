import React from 'react';
import {AppBar, Typography, Box, Toolbar} from '@mui/material';

function Navbar() {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static" style={{height:70}}>
                    <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Form
                    </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar
