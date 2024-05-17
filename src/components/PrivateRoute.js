import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';


const PrivateRoute = () => {

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div>
      {loading === false && (isAuthenticated ? <Outlet/> : <Navigate to="/" />)}
    </div>
  );
}


export default PrivateRoute