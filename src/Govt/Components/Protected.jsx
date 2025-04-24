import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/Govtlogin" replace />;
  }

  return <Outlet />;
};

export default Protected;
