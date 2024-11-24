// src/components/UserManagement.js

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Button, IconButton, Tooltip, TextField,
  Container, Typography
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';
import AddUserDialog from './dialogs/AddUserDialog';
import EditUserDialog from './dialogs/EditUserDialog';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    marginTop: 32, // Use a fixed value instead of theme.spacing
  },
  header: {
    marginBottom: 16, // Use a fixed value instead of theme.spacing
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  button: {
    marginBottom: 16, // Use a fixed value instead of theme.spacing
  },
  table: {
    marginTop: 16, // Use a fixed value instead of theme.spacing
  },
});

const UserManagement = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data.roles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.header}>User Management</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddDialog(true)}
        startIcon={<Add />}
        className={classes.button}
      >
        Add User
      </Button>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => requestSort('name')}>Name</TableCell>
            <TableCell onClick={() => requestSort('role')}>Role</TableCell>
            <TableCell onClick={() => requestSort('status')}>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers
            .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((user) => {
              const userRole = roles.find((role) => role.id === user.roleId);
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{userRole ? userRole.name : 'N/A'}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => setEditUser(user)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(user.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {/* Add User Dialog */}
      <AddUserDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onUserAdded={fetchUsers}
        roles={roles}
      />

      {/* Edit User Dialog */}
      {editUser && (
        <EditUserDialog
          open={Boolean(editUser)}
          onClose={() => setEditUser(null)}
          user={editUser}
          onUserUpdated={fetchUsers}
          roles={roles}
        />
      )}
    </Container>
  );
};

export default UserManagement;
