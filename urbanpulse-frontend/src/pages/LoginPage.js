import React, { useState } from "react";
import { toast } from "react-toastify";
import authService from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      toast.error("Email is required");
      return;
    }

    if (!trimmedPassword) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      const user = await authService.login(trimmedEmail, trimmedPassword);
      const userRole = user?.role?.toUpperCase() || "";

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", userRole.toLowerCase());
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful");

      setTimeout(() => {
        if (userRole === "ADMIN") {
          window.location.href = "/dashboard";
        } else if (userRole === "WORKER") {
          window.location.href = "/worker-dashboard";
        } else {
          window.location.href = "/issues";
        }
      }, 1000);
    } catch (error) {
      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card mx-auto p-4 shadow-lg border-0"
        style={{
          maxWidth: "450px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center mb-2 fw-bold">Urban Pulse AI</h2>

        <p className="text-center text-muted mb-4">
          Smart City Management Portal
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr />

        <div className="alert alert-info mb-0">
          <small className="fw-semibold">Backend Login Enabled</small>
          <br />
          <small className="fw-semibold">Demo Credentials:</small>
          <br />
          <small>admin@gmail.com / 12345</small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
