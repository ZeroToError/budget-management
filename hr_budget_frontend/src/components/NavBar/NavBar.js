import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1, width: '100%', textAlign: 'center' }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon /> 
          </IconButton>*/}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Quản lý quỹ HR - &#169; HungNV127
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
