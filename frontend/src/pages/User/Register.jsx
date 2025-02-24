import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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

    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ text: "All fields are required!", type: "danger" });
      return;
    }

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

    setTimeout(() => navigate("/login"), 2000);
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

        {message.text && <div className={`alert alert-${message.type} text-center`}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="firstname" className="form-control" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" name="lastname" className="form-control" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
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
          Already have an account? <a href="/login" className="text-white fw-bold">Login here</a>
        </p>

        <div className="d-flex flex-column gap-2 mt-3">
          <button className="btn btn-light border w-100 d-flex align-items-center justify-content-center">
            <FcGoogle size={20} className="me-2" />
            Continue with Google
          </button>
          <button className="btn btn-dark w-100 d-flex align-items-center justify-content-center">
            <FaGithub size={20} className="me-2" />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
