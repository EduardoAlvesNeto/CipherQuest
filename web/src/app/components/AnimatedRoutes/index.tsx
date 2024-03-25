import { Route, Routes, useLocation } from 'react-router-dom';

import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Dashboard from '../../pages/Dashboard';

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="*" Component={Login} />
    </Routes>
  );
};
