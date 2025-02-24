import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { Alert } from 'react-bootstrap'; 

export default function Register() {
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('All fields are required!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    addUser(formData.first_name, formData.last_name, formData.email, formData.password);
    navigate('/login');
  };

  // Google Authentication
  const handleGoogleSignUp = (credential) => {
    const user_details = jwtDecode(credential);
    addUser(user_details.given_name, user_details.family_name, user_details.email, formData.password); 
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-4 shadow-lg"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Register</h3>

        {message && (
          <Alert variant={message.includes('successful') ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}

        <div className="mb-4">
          <label className="form-label text-muted fw-semibold">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="form-control rounded-pill"
            placeholder="Enter First Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-muted fw-semibold">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="form-control rounded-pill"
            placeholder="Enter Last Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-muted fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control rounded-pill"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-muted fw-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control rounded-pill"
            placeholder="Password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-muted fw-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control rounded-pill"
            placeholder="Repeat Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 rounded-pill fw-semibold">
          Sign Up
        </button>

        <div className="text-center mt-3">
          <p className="text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary fw-semibold">
              Login
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <p className="text-muted">Or sign up with</p>
          <div className="text-center mt-3">
      <GoogleLogin
      onSuccess={credentialResponse => {
        handleGoogleSignUp(credentialResponse.credential)}}
        onError={() => {
          console.log('Login Failed');}}/>;
      </div>
        </div>
      </form>
    </div>
  );
}
