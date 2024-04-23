// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
  const currentUser = useContext(AuthContext);

  //return currentUser ? children : <Navigate to="/login" {...rest} />;
  return currentUser ? <Outlet /> : <Navigate to="/"  />;

};

export default PrivateRoute;
