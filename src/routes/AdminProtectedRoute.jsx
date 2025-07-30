import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ element: Element }) => {
  const adminToken = localStorage.getItem("admintoken");
  return adminToken ? <Element /> : <Navigate to="/admin_login" />;
};

export default AdminProtectedRoute; 