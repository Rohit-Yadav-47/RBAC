// src/components/RoleManagement.js

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Checkbox, Button, IconButton,
  Snackbar,
  Container, Typography, Grid, Paper
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';
import AddRoleDialog from './dialogs/AddRoleDialog';
import EditRoleDialog from './dialogs/EditRoleDialog';
import './css/RoleManagement.css';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [roleData, setRoleData] = useState({
    name: '',
    permissions: [],
  });

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data.roles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('/api/permissions');
      setPermissions(response.data.permissions);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      setSnackbarMessage('Error deleting role. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container className="container">
      <Typography variant="h4" className="header">Role Management</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddDialog(true)}
        startIcon={<Add />}
        className="button"
      >
        Add Role
      </Button>
      <div className="gridContainer">
        <Grid container spacing={3}>
          {roles.map((role) => (
            <Grid item xs={12} sm={6} md={4} key={role.id}>
              <Paper className="paper">
                <Typography variant="h6">
                  {role.name}
                  <IconButton onClick={() => setEditRole(role)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(role.id)}>
                    <Delete />
                  </IconButton>
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      {permissions.map((perm) => (
                        <TableCell key={perm}>{perm}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {permissions.map((perm) => (
                        <TableCell key={perm}>
                          <Checkbox
                            checked={role.permissions.includes(perm)}
                            onChange={async () => {
                              const updatedPermissions = role.permissions.includes(perm)
                                ? role.permissions.filter((p) => p !== perm)
                                : [...role.permissions, perm];

                              try {
                                await axios.put(`/api/roles/${role.id}`, {
                                  ...role,
                                  permissions: updatedPermissions,
                                });
                                fetchRoles();
                              } catch (error) {
                                console.error('Error updating role permissions:', error);
                              }
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Add Role Dialog */}
      <AddRoleDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onRoleAdded={fetchRoles}
        permissions={permissions}
        roleData={roleData}
        setRoleData={setRoleData}
      />

      {/* Edit Role Dialog */}
      {editRole && (
        <EditRoleDialog
          open={Boolean(editRole)}
          onClose={() => setEditRole(null)}
          role={editRole}
          onRoleUpdated={fetchRoles}
          permissions={permissions}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default RoleManagement;