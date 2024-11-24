// src/components/UserManagement.js

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Button, IconButton, Tooltip, TextField,
  Container, Typography, Snackbar, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Edit, Delete, Add, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import axios from 'axios';
import AddUserDialog from './dialogs/AddUserDialog';
import EditUserDialog from './dialogs/EditUserDialog';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import './css/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
      setSnackbarMessage('User deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbarMessage('Error deleting user');
      setSnackbarOpen(true);
    }
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'role') {
          const aRole = roles.find((role) => role.id === a.roleId);
          const bRole = roles.find((role) => role.id === b.roleId);
          aValue = aRole ? aRole.name : '';
          bValue = bRole ? bRole.name : '';
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig, roles]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const toggleSortDirection = () => {
    setSortConfig((prevSortConfig) => ({
      ...prevSortConfig,
      direction: prevSortConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const importedUsers = Papa.parse(text, { header: true }).data;
      const formattedUsers = importedUsers.map((user, index) => ({
        ...user,
        id: users.length + index + 1,
        roleId: parseInt(user.roleId, 10),
        status: user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase() : 'Active',
      }));
      try {
        for (const user of formattedUsers) {
          await axios.post('/api/users', user);
        }
        fetchUsers();
        setSnackbarMessage('Users imported successfully');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error importing users:', error);
        setSnackbarMessage('Error importing users');
        setSnackbarOpen(true);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Container className="container">
      <Typography variant="h4" className="header">User Management</Typography>
      <Box className="buttonContainer">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddDialog(true)}
          startIcon={<Add />}
          className="button"
        >
          Add User
        </Button>
        <Box display="flex" justifyContent="center" flexGrow={1}>
          <input
            accept=".csv"
            style={{ display: 'none' }}
            id="import-button"
            type="file"
            onChange={handleImport}
          />
          <label htmlFor="import-button">
            <Button variant="contained" color="secondary" component="span" className="button">
              Import Users (CSV)
            </Button>
          </label>
        </Box>
        <CSVLink data={users} filename="users.csv">
          <Button variant="contained" color="secondary" className="button">
            Export Users (CSV)
          </Button>
        </CSVLink>
      </Box>
      <Box className="searchBox">
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchField"
        />
        <FormControl variant="outlined" className="formControl">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortConfig.key}
            onChange={(e) => requestSort(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="role">Role</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={toggleSortDirection} className="sortButton">
          {sortConfig.direction === 'ascending' ? <ArrowUpward /> : <ArrowDownward />}
        </IconButton>
      </Box>
      <Table className="table">
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
            .filter((user) => user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default UserManagement;