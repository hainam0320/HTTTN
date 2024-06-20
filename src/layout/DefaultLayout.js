import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import ManageTestPage from '../views/test/TestPage'; 
import UserList from '../views/manage-user/UserList';
import Dashboard from '../views/dashboard/Dashboard';

const DefaultLayout = ({ handleLogout }) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader handleLogout={handleLogout} />
        <div className="body flex-grow-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/management/users" element={<UserList />} />
            <Route path="/test" element={<ManageTestPage />} /> 
            <Route path="/my-tests" element={<ManageTestPage />} /> 
          </Routes>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
