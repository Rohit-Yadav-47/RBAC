// src/components/dialogs/EditUserDialog.js

import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Button,
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import axios from 'axios';

const EditUserDialog = ({ open, onClose, user, onUserUpdated, roles }) => {
  const [userData, setUserData] = useState({
    name: user.name,
    roleId: user.roleId,
    status: user.status,
  });

  const handleSubmit = async () => {
    await axios.put(`/api/users/${user.id}`, userData);
    onUserUpdated();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
