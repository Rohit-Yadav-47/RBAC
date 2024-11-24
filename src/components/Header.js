// src/components/Header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 16,
    '@media (min-width:600px)': {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  navLinks: {
    display: 'none',
    '@media (min-width:600px)': {
      display: 'flex',
    },
  },
  appBar: {
    backgroundColor: '#333',
  },
  drawer: {
    width: 250,
  },
});

const Header = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <div className={classes.drawer} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button component={NavLink} to="/" exact>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={NavLink} to="/roles">
          <ListItemText primary="Roles" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            RBAC Admin Dashboard
          </Typography>
          <div className={classes.navLinks}>
            <Button color="inherit" component={NavLink} to="/" exact>
              Users
            </Button>
            <Button color="inherit" component={NavLink} to="/roles">
              Roles
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </div>
  );
};

export default Header;
