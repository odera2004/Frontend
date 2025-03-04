import { useState, useContext, useEffect } from "react";
import { FiUpload, FiSearch, FiSun, FiMoon } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../../context/UserContext"; // Import UserContext

const Profile = () => {
  const { current_user, fetchCurrentUser } = useContext(UserContext); // Access user details
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [search, setSearch] = useState("");
  
  // Fetch user details on mount
  useEffect(() => {
    if (!current_user) {
      fetchCurrentUser(); // Ensure user data is loaded
    }
  }, [current_user, fetchCurrentUser]);

  // Ensure default values are not null
  const username = current_user?.first_name + " " + current_user?.last_name || "User";
  const bio = current_user?.bio || "Welcome to my profile!";
  const services = current_user?.services || []; // Assuming `services` exist in user data

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`container py-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">My Profile</h2>
        <button className={`btn ${darkMode ? "btn-light" : "btn-dark"}`} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Profile Card */}
      <div className="card p-4 text-center shadow-sm border-0 rounded">
        <div className="position-relative mx-auto" style={{ width: "140px" }}>
          <img
            src={profileImage || "https://via.placeholder.com/140"}
            alt="Profile"
            className="rounded-circle w-100 border border-primary shadow"
          />
          <label
            className="btn btn-sm btn-outline-primary position-absolute"
            htmlFor="imageUpload"
            style={{ bottom: "10px", left: "50%", transform: "translateX(-50%)", cursor: "pointer" }}
          >
            <FiUpload />
          </label>
          <input type="file" id="imageUpload" className="d-none" onChange={handleImageUpload} accept="image/*" />
        </div>
        <h3 className="mt-3">{username}</h3>
        <p>{bio}</p>
      </div>

      {/* Service History */}
      <div className="card mt-4 p-3 shadow-sm border-0 rounded">
        <h4 className="mb-3 fw-semibold">Service History</h4>
        <div className="input-group mb-3">
          <span className="input-group-text"><FiSearch /></span>
          <input type="text" className="form-control" placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Service Type</th>
                <th>Date</th>
                <th>Mechanic</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {services.filter(s => s.type.toLowerCase().includes(search.toLowerCase())).map((service, index) => (
                <tr key={index}>
                  <td>{service.type}</td>
                  <td>{service.date}</td>
                  <td>{service.mechanic}</td>
                  <td>{service.cost}</td>
                  <td>
                    <span className={`badge ${service.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                      {service.status}
                    </span>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No services found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;