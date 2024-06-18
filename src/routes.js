import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Login = React.lazy(() => import('./views/pages/Login'));

const routes = [
  { path: '/', exact: true, name: 'Login', element: Login },
  { path: '/login', name: 'Login', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
];

export default routes;
