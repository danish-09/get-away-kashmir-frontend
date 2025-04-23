import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component wraps routes that require authentication
// It checks if the user is logged in before rendering the protected content
const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated by looking for token in localStorage
  // const isAuthenticated = localStorage.getItem("isAuthenticated");

  // // If user is not authenticated, redirect to login page
  // if (!isAuthenticated) {
  //   // Navigate component from react-router-dom handles the redirect
  //   // 'replace' prop replaces the current history entry instead of adding a new one
  //   return <Navigate to="/login" replace />;
  // }

  // If authenticated, render the protected content (children)
  return children;
};

export default ProtectedRoute;
