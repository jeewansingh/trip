import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost/trippartner/auth/admin_login.php"; // Adjust if needed

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("admintoken", result.token);
        localStorage.removeItem("isAdmin");
        toast.success(result.message || "Login successful!");
        setTimeout(() => {
          navigate("/admin_dashboard");
        }, 1000);
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err) {
      toast.error("Network error");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          minWidth: 320,
        }}
      >
        <h2 style={{ marginBottom: 24, textAlign: "center" }}>Admin Login</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 6,
            border: "none",
            background: "#1976d2",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <ToastContainer position="top-right" autoClose={3000} />
      </form>
    </div>
  );
};

export default AdminLogin;
