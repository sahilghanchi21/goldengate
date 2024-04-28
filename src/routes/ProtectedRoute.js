// ProtectedRoute.js
import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let location = useLocation();
  console.log(isLoggedIn, "isLoggedIn in protected routes");
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
