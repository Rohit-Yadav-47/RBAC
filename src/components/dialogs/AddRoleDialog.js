import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Button,
  FormControlLabel, Checkbox, CircularProgress,
  Snackbar
} from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const ButtonStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const DialogStyled = styled(Dialog)(({ theme }) => ({}));

const AddRoleDialog = ({ open, onClose, onRoleAdded, permissions, roleData, setRoleData }) => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handlePermissionChange = (permission) => {
    setRoleData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/roles', roleData);
      if (response.status === 201) {
        onRoleAdded();
        onClose();
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogStyled open={open} onClose={onClose}>
        <DialogTitle>Add New Role</DialogTitle>
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
          <ButtonStyled onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add'}
          </ButtonStyled>
        </DialogActions>
      </DialogStyled>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Role added successfully"
      />
    </>
  );
};

export default AddRoleDialog;