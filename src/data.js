// src/data/data.js

export const permissionsList = ['Read', 'Write', 'Delete', 'Update'];

export const rolesList = [
  {
    id: 1,
    name: 'Admin',
    permissions: ['Read', 'Write', 'Delete', 'Update'],
  },
  {
    id: 2,
    name: 'Editor',
    permissions: ['Read', 'Write', 'Update'],
  },
  {
    id: 3,
    name: 'Viewer',
    permissions: ['Read'],
  },
];

export const usersList = [
  {
    id: 1,
    name: 'John Doe',
    roleId: 1,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    roleId: 2,
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    roleId: 3,
    status: 'Active',
  },
];
