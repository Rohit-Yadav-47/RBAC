// src/components/dialogs/EditRoleDialog.js

import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Button,
  FormControlLabel, Checkbox,
} from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

// Styled Button without rounded corners
const ButtonStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  // Removed rounded corners
}));

// Styled Dialog without rounded corners
const DialogStyled = styled(Dialog)(({ theme }) => ({
  // Removed rounded corners
}));

const EditRoleDialog = ({ open, onClose, role, onRoleUpdated, permissions }) => {
  const [roleData, setRoleData] = useState({
    name: role.name,
    permissions: role.permissions,
  });

  const handlePermissionChange = (permission) => {
    setRoleData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = async () => {
    await axios.put(`/api/roles/${role.id}`, roleData);
    onRoleUpdated();
    onClose();
  };

  return (
    <DialogStyled open={open} onClose={onClose}>
      <DialogTitle>Edit Role</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          fullWidth
          margin="dense"
          value={roleData.name}
          onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
        />
        <div style={{ marginTop: '1rem' }}>
          {permissions.map((perm) => (
            <FormControlLabel
              key={perm}
              control={
                <Checkbox
                  checked={roleData.permissions.includes(perm)}
                  onChange={() => handlePermissionChange(perm)}
                />
              }
              label={perm}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <ButtonStyled onClick={onClose}>Cancel</ButtonStyled>
        <ButtonStyled onClick={handleSubmit} variant="contained" color="primary">
          Update
        </ButtonStyled>
      </DialogActions>
    </DialogStyled>
  );
};

export default EditRoleDialog;
