// src/components/RoleManagement.js

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Checkbox, Button, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Snackbar,
  Box, Grid, Paper,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';
import AddRoleDialog from './dialogs/AddRoleDialog';
import EditRoleDialog from './dialogs/EditRoleDialog';
import { styled } from '@mui/material/styles';

// Define custom styles using styled API
const Container = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Header = styled('h2')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontFamily: 'Arial, sans-serif',
  color: '#333',
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: '16px',
  boxShadow: theme.shadows[5],
  transition: '0.3s',
  '&:hover': {
    boxShadow: theme.shadows[10],
  },
}));

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
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

  const handleDelete = (id) => {
    setRoleToDelete(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      console.log(`Attempting to delete role with ID: ${roleToDelete}`); // Debugging log
      await axios.delete(`/api/roles/${roleToDelete}`);
      fetchRoles();
      setOpenConfirmDialog(false);
      setSnackbarMessage('Role deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting role:', error);
      setSnackbarMessage('Error deleting role. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/roles', roleData);
      if (response.status === 201) {
        fetchRoles();
        setSnackbarMessage('Role added successfully!');
        setSnackbarOpen(true);
        setOpenAddDialog(false);
      }
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  return (
    <Container>
      <Header>Role Management</Header>
      <ButtonStyled
        variant="contained"
        color="primary"
        onClick={() => setOpenAddDialog(true)}
        startIcon={<Add />}
      >
        Add Role
      </ButtonStyled>
      <Grid container spacing={2}>
        {roles.map((role) => (
          <Grid item xs={12} sm={6} md={4} key={role.id}>
            <PaperStyled>
              <h3>
                {role.name}
                <IconButton onClick={() => setEditRole(role)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(role.id)}>
                  <Delete />
                </IconButton>
              </h3>
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
            </PaperStyled>
          </Grid>
        ))}
      </Grid>

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
