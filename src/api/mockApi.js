// src/api/mockApi.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { usersList as initialUsersList, rolesList as initialRolesList, permissionsList } from '../data';

// Create local copies of the data
let usersList = [...initialUsersList];
let rolesList = [...initialRolesList];

const mock = new MockAdapter(axios, { delayResponse: 500 });

/**
 * Users API Endpoints
 */

// GET /api/users
mock.onGet('/api/users').reply(() => {
    console.log('GET /api/users called');
    return [200, { users: usersList }];
  });
  
  // POST /api/users
  mock.onPost('/api/users').reply((config) => {
    console.log('POST /api/users called with data:', config.data);
    const newUser = JSON.parse(config.data);
    newUser.id = usersList.length > 0 ? usersList[usersList.length - 1].id + 1 : 1;
    usersList.push(newUser);
    console.log('New user added:', newUser);
    return [201, { message: 'User added successfully', user: newUser }];
  });

// PUT /api/users/:id
mock.onPut(new RegExp('/api/users/\\d+$')).reply((config) => {
  console.log(`PUT ${config.url} called with data:`, config.data);
  const idMatch = config.url.match(/\/api\/users\/(\d+)$/);
  if (idMatch && idMatch[1]) {
    const id = parseInt(idMatch[1], 10);
    const updatedUser = JSON.parse(config.data);
    const index = usersList.findIndex((user) => user.id === id);
    if (index !== -1) {
      usersList[index] = { ...usersList[index], ...updatedUser };
      console.log('User updated:', usersList[index]);
      return [200, { message: 'User updated successfully', user: usersList[index] }];
    } else {
      console.log('User not found for update');
      return [404, { message: 'User not found' }];
    }
  } else {
    console.log('Invalid URL for PUT /api/users/:id');
    return [400, { message: 'Invalid user ID' }];
  }
});

// DELETE /api/users/:id
mock.onDelete(new RegExp('/api/users/\\d+$')).reply((config) => {
  console.log(`DELETE ${config.url} called`);
  const idMatch = config.url.match(/\/api\/users\/(\d+)$/);
  if (idMatch && idMatch[1]) {
    const id = parseInt(idMatch[1], 10);
    const index = usersList.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = usersList.splice(index, 1);
      console.log('User deleted:', deletedUser);
      return [200, { message: 'User deleted successfully' }];
    } else {
      console.log('User not found for deletion');
      return [404, { message: 'User not found' }];
    }
  } else {
    console.log('Invalid URL for DELETE /api/users/:id');
    return [400, { message: 'Invalid user ID' }];
  }
});

/**
 * Roles API Endpoints
 */

// GET /api/roles
mock.onGet('/api/roles').reply(() => {
    console.log('GET /api/roles called');
    return [200, { roles: rolesList }];
  });
  
  // POST /api/roles
  mock.onPost('/api/roles').reply((config) => {
    console.log('POST /api/roles called with data:', config.data);
    const newRole = JSON.parse(config.data);
    newRole.id = rolesList.length > 0 ? rolesList[rolesList.length - 1].id + 1 : 1;
    rolesList.push(newRole);
    console.log('New role added:', newRole);
    return [201, { message: 'Role added successfully', role: newRole }];
  });

// PUT /api/roles/:id
mock.onPut(new RegExp('/api/roles/\\d+$')).reply((config) => {
  console.log(`PUT ${config.url} called with data:`, config.data);
  const idMatch = config.url.match(/\/api\/roles\/(\d+)$/);
  if (idMatch && idMatch[1]) {
    const id = parseInt(idMatch[1], 10);
    const updatedRole = JSON.parse(config.data);
    const index = rolesList.findIndex((role) => role.id === id);
    if (index !== -1) {
      rolesList[index] = { ...rolesList[index], ...updatedRole };
      console.log('Role updated:', rolesList[index]);
      return [200, { message: 'Role updated successfully', role: rolesList[index] }];
    } else {
      console.log('Role not found for update');
      return [404, { message: 'Role not found' }];
    }
  } else {
    console.log('Invalid URL for PUT /api/roles/:id');
    return [400, { message: 'Invalid role ID' }];
  }
});

// DELETE /api/roles/:id
mock.onDelete(new RegExp('/api/roles/\\d+$')).reply((config) => {
  console.log(`DELETE ${config.url} called`);
  const idMatch = config.url.match(/\/api\/roles\/(\d+)$/);
  if (idMatch && idMatch[1]) {
    const id = parseInt(idMatch[1], 10);
    const index = rolesList.findIndex((role) => role.id === id);
    if (index !== -1) {
      rolesList.splice(index, 1);
      console.log('Role deleted:', rolesList);
      return [200, { message: 'Role deleted successfully' }];
    } else {
      console.log('Role not found for deletion');
      return [404, { message: 'Role not found' }];
    }
  } else {
    console.log('Invalid URL for DELETE /api/roles/:id');
    return [400, { message: 'Invalid role ID' }];
  }
});

/**
 * Permissions API Endpoints
 */

// GET /api/permissions
mock.onGet('/api/permissions').reply(() => {
    console.log('GET /api/permissions called');
    return [200, { permissions: permissionsList }];
  });

