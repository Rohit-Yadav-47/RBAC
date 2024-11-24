// src/components/Header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          RBAC Admin Dashboard
        </Typography>
        <Button color="inherit" component={NavLink} to="/" exact="true">
          Users
        </Button>
        <Button color="inherit" component={NavLink} to="/roles">
          Roles
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
