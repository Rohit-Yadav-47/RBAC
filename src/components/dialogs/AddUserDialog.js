// src/components/dialogs/AddUserDialog.js

import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Button,
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import axios from 'axios';

const AddUserDialog = ({ open, onClose, onUserAdded, roles }) => {
  const [userData, setUserData] = useState({
    name: '',
    roleId: '',
    status: 'Active',
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/users', userData);
      if (response.status === 201) {
        onUserAdded();
        onClose();
        setUserData({ name: '', roleId: '', status: 'Active' });
      }
    } catch (error) {
      console.error('Error adding user:', error);
      // Optionally, handle the error (e.g., show a notification to the user)
    }
  };

  return (
    <Dialog open={open} onClose={() => {
      onClose();
      setUserData({ name: '', roleId: '', status: 'Active' });
    }}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="dense"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Role</InputLabel>
          <Select
            value={userData.roleId}
            onChange={(e) => setUserData({ ...userData, roleId: e.target.value })}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            value={userData.status}
            onChange={(e) => setUserData({ ...userData, status: e.target.value })}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          onClose();
          setUserData({ name: '', roleId: '', status: 'Active' });
        }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
