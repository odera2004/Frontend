import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const { login, login_with_google } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  // Google Authentication
  const handleGoogleSignIn = (credential) => {
    const user_details = jwtDecode(credential);
    login_with_google(user_details.email);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>

        {/* Email Input */}
        <div className="mb-3">
          <label className="form-label text-muted fw-semibold">Email Address</label>
          <input
            type="email"
            className="form-control rounded-pill"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label className="form-label text-muted fw-semibold">Password</label>
          <input
            type="password"
            className="form-control rounded-pill"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 rounded-pill fw-semibold">
          Login
        </button>

        {/* Register Link */}
        <div className="text-center mt-3">
          <p className="text-muted">
            Don't have an account? <a href="/register" className="text-primary fw-semibold">Register here</a>
          </p>
        </div>
        
        {/* Login with Google Link */}
        <div className="text-center mt-4">
          <p className="text-muted">Or sign up with</p>
          <div className="text-center mt-3">
            <GoogleLogin
              onSuccess={credentialResponse => {
                handleGoogleSignIn(credentialResponse.credential)
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}