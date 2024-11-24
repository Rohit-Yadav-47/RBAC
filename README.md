# RBAC Admin Dashboard ReadMe

Live: https://rbac-theta.vercel.app/

## Overview

The RBAC (Role-Based Access Control) Admin Dashboard is a React-based application that allows administrators to manage users, roles, and permissions in an intuitive interface. This application features user and role management tools, including adding, editing, deleting, and assigning permissions.

## Features

### 1. User Management
- **Add Users**: Add new users with names, roles, and status.
- **Edit Users**: Update user details such as name, role, and status.
- **Delete Users**: Remove users from the system.
- **Import/Export Users**: 
  - Import users from CSV files.
  - Export user data to CSV files for external use.
- **Search and Sort**: Search users by name and sort by name, role, or status.

### 2. Role Management
- **Add Roles**: Create new roles with a custom set of permissions.
- **Edit Roles**: Modify role names and permissions.
- **Delete Roles**: Remove roles from the system.
- **Assign Permissions**: Assign or revoke permissions for specific roles.

### 3. Permissions Management
- **Predefined Permissions**: The app provides a predefined list of permissions (`Read`, `Write`, `Delete`, `Update`).

### 4. Responsive Design
- Fully responsive with optimized layouts for desktop and mobile.

### 5. Mock API
- Uses `axios-mock-adapter` to simulate API requests for a seamless development experience.

## File Structure

### Components
- **Dialogs**
  - `AddRoleDialog.js`: Dialog for adding new roles.
  - `AddUserDialog.js`: Dialog for adding new users.
  - `EditRoleDialog.js`: Dialog for editing existing roles.
  - `EditUserDialog.js`: Dialog for editing existing users.
- **Management Pages**
  - `UserManagement.js`: Page to manage users with search, sort, import/export functionality.
  - `RoleManagement.js`: Page to manage roles and assign permissions.
- **Header**
  - `Header.js`: Application header with navigation links for users and roles.

### Data
- `data.js`: Contains initial mock data for users, roles, and permissions.

### Mock API
- `mockApi.js`: Simulates API endpoints for users, roles, and permissions using `axios-mock-adapter`.

### App
- `App.js`: Main application file that sets up routing and integrates all components.

## How to Run

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## Mock API Endpoints
### Users
- **GET** `/api/users`: Fetch all users.
- **POST** `/api/users`: Add a new user.
- **PUT** `/api/users/:id`: Update a user by ID.
- **DELETE** `/api/users/:id`: Delete a user by ID.

### Roles
- **GET** `/api/roles`: Fetch all roles.
- **POST** `/api/roles`: Add a new role.
- **PUT** `/api/roles/:id`: Update a role by ID.
- **DELETE** `/api/roles/:id`: Delete a role by ID.

### Permissions
- **GET** `/api/permissions`: Fetch all permissions.

## Tech Stack
- **Frontend**: React, Material-UI
- **Routing**: React Router
- **Mock API**: axios-mock-adapter
- **File Handling**: PapaParse for CSV import/export

## Future Enhancements
- **Authentication**: Add login/logout functionality with user authentication.
- **Database Integration**: Replace mock API with a real backend.
- **Enhanced Permissions**: Add granular permissions for finer control.
- **Audit Logs**: Record changes to roles and users for auditing purposes.

## Contributions
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License
This project is open-sourced under the MIT License. 

For further queries, feel free to open an issue in the repository.
