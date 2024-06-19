import React, { Suspense, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/Login'));
const Register = React.lazy(() => import('./views/pages/Register'));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <HashRouter>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/login" name="Login Page" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" name="Register Page" element={<Register />} />
          <Route path="*" name="Home" element={isAuthenticated ? <DefaultLayout handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
