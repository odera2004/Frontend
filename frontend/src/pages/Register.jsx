import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ text: "All fields are required!", type: "danger" });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: "Invalid email format!", type: "danger" });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ text: "Password must be at least 6 characters!", type: "danger" });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "danger" });
      return;
    }

    setMessage({ text: `Account created successfully! Welcome, ${formData.firstname}!`, type: "success" });

    //  redirect to login
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100">
      <div className="register-card card shadow-lg p-5 w-75">
        <h2 className="text-center fw-bold">Register</h2>
        {message.text && (
          <div className={`alert alert-${message.type} text-center`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="firstname"
                className="form-control"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-primary">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
