import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    addUser(formData.first_name, formData.last_name, formData.email, formData.password);
    setMessage("Account created successfully!");
    setTimeout(() => navigate("/login"), 4000);
  };

  const handleGoogleSignUp = (credential) => {
    const user_details = jwtDecode(credential);
    addUser(user_details.given_name, user_details.family_name, user_details.email, "");
    navigate("/dashboard");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "url('https://i.pinimg.com/236x/ac/cd/20/accd20308f4764ad59f22a83df9f647d.jpg') no-repeat center center / cover",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
        }}
      ></div>

      <div className="card p-4 shadow-lg text-white" style={{ width: "400px", zIndex: 1, background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)", borderRadius: "15px" }}>
        <h2 className="text-center fw-bold mb-3">Register</h2>

        {message && <Alert variant={message.includes("successfully") ? "success" : "danger"}>{message}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="first_name" className="form-control" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" name="last_name" className="form-control" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-white fw-bold">Login here</Link>
        </p>

        <div className="text-center mt-4">
          <p className="text-muted">Or sign up with</p>
          <div className="text-center mt-3">
      <GoogleLogin
      onSuccess={credentialResponse => {
        handleGoogleSignUp(credentialResponse.credential)}}
        onError={() => {
          console.log('Login Failed');}}/>
      </div>
        </div>
      </div>
    </div>
  );
}