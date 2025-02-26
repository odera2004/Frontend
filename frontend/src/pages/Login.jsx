import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const { login, login_with_google } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await login(formData.email, formData.password);
      setUserName(formData.email.split("@")[0]);
      toast.success(`You've logged in successfully! Welcome, ${formData.email.split("@")[0]}`);
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleSignIn = (credential) => {
    const user_details = jwtDecode(credential);
    login_with_google(user_details.email);
    setUserName(user_details.given_name);
    toast.success(`You've logged in successfully! Welcome, ${user_details.given_name}`);
    navigate("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/1489285854/photo/mechanic-changing-a-flat-tire-and-carrying-a-wheel-at-a-repair-garage.jpg?s=612x612&w=0&k=20&c=rtdmGie6PSUkDIlOi9qGa2EfzC5hZhNicMcsrG0OI2U=")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          background: "rgba(44, 62, 80, 0.95)",
          color: "white",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "12px",
        }}
      >
        <h2 className="text-center fw-bold">Login</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="form-control rounded-pill px-3 py-2"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="form-control rounded-pill px-3 py-2"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 text-dark fw-bold rounded-pill shadow-sm mt-2" style={{ transition: "0.3s ease-in-out" }}>
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="text-warning fw-bold">Register here</a>
        </p>
        <div className="text-center mt-4">
          <p className="mb-2">Or sign in with</p>
          <div className="d-flex justify-content-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleSignIn(credentialResponse.credential);
              }}
              onError={() => {
                toast.error("Google sign-in failed.");
              }}
              className="google-login-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
