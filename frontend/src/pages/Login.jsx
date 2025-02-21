import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("You have logged in successfully!");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/1489285854/photo/mechanic-changing-a-flat-tire-and-carrying-a-wheel-at-a-repair-garage.jpg?s=612x612&w=0&k=20&c=rtdmGie6PSUkDIlOi9qGa2EfzC5hZhNicMcsrG0OI2U=")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          background: "rgba(44, 62, 80, 0.9)", // Dark blue-gray with transparency
          color: "white",
          width: "90%",
          maxWidth: "400px",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-center fw-bold">Login</h2>
        {message && <div className="alert alert-success text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-4">
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
          <div className="mb-4">
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
          <button type="submit" className="btn btn-warning w-100 text-dark fw-bold">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="text-warning fw-bold">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
