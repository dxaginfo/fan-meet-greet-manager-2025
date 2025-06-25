import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import { CircularProgress, Box } from '@mui/material';
import { useGetProfileQuery } from '../store/services/api';

/**
 * Protected Route component
 * Checks if user is authenticated, if not redirects to login
 * Also fetches user profile if authenticated
 */
const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // Fetch user profile if authenticated
  const { isLoading } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated, // Skip query if not authenticated
  });

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;