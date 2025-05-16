// PublicRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ element: Component }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // Verify token with backend
    fetch("http://localhost/trippartner/auth/verify.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token }),
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? <Navigate to="/home" /> : <Component />;
}

export default PublicRoute;
