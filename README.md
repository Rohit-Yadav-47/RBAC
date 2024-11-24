# RBAC Admin Dashboard

Live : https://rbac-dnn0.onrender.com/

A powerful Role-Based Access Control (RBAC) Admin Dashboard built with **React** and **Material-UI**, enabling administrators to effectively manage users and roles, and assign permissions. The dashboard includes a mock API for seamless simulation of backend operations.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Data](#data)
- [Learn More](#learn-more)

---

## Features

- **User Management**: Add, edit, delete, and search users with an intuitive interface.
- **Role Management**: Create, edit, delete, and assign permissions to roles effortlessly.
- **Mock API**: Utilize a simulated backend using `axios-mock-adapter` for API interactions.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.

---

## Project Structure

The project follows a modular structure for scalability and readability:

```
src/
├── components/          # Reusable components
├── pages/               # Main pages for the app
├── utils/               # Utility functions
├── mock/                # Mock API implementation
├── data.js              # Initial data for users, roles, and permissions
└── App.js               # Application root
```

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/rbac-admin-dashboard.git
   cd rbac-admin-dashboard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

---

## Available Scripts

Inside the project directory, you can use the following scripts:

### `npm start`

Runs the app in development mode.  
Visit [http://localhost:3000](http://localhost:3000) to preview.

### `npm test`

Launches the test runner in watch mode.  
Refer to [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more details.

### `npm run build`

Creates an optimized production build in the `build` folder.  
Bundles React in production mode for improved performance.

### `npm run eject`

**Note**: This is a one-way operation. Once you eject, you cannot undo it.  
Eject to gain full control over the build configuration.

---

## API Endpoints

The mock API is implemented in `mockApi.js` using `axios-mock-adapter`. Below are the available endpoints:

### Users

- **`GET /api/users`**: Fetch all users.
- **`POST /api/users`**: Add a new user.
- **`PUT /api/users/:id`**: Update an existing user.
- **`DELETE /api/users/:id`**: Delete a user.

### Roles

- **`GET /api/roles`**: Fetch all roles.
- **`POST /api/roles`**: Add a new role.
- **`PUT /api/roles/:id`**: Update an existing role.
- **`DELETE /api/roles/:id`**: Delete a role.

### Permissions

- **`GET /api/permissions`**: Fetch all permissions.

---

## Components

### Header

The `Header` component serves as the navigation bar, providing links to:

- **User Management**: Manage users.
- **Role Management**: Manage roles and permissions.

### User Management

The `UserManagement` component offers a range of features:

- Add, edit, delete, and search users.
- Display user data in an organized table.

### Role Management

The `RoleManagement` component allows administrators to:

- Add, edit, and delete roles.
- Assign permissions to roles.

### Dialogs

- **AddUserDialog**: Dialog for adding a new user.
- **EditUserDialog**: Dialog for editing an existing user.
- **AddRoleDialog**: Dialog for adding a new role.
- **EditRoleDialog**: Dialog for editing an existing role.

---

## Data

Initial mock data for users, roles, and permissions is stored in `data.js`. The data is preloaded into the mock API to simulate realistic backend responses.
