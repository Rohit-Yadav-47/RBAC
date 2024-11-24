// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import './api/mockApi';

function App() {
  return (
    <Router>
      <Header />
      <Container style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<UserManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
