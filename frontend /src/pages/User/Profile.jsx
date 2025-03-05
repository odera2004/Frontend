import { useState, useContext, useEffect } from "react";
import { FiUpload, FiSearch, FiSun, FiMoon, FiEdit, FiTrash } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../../context/UserContext"; // Import UserContext

const Profile = () => {
  const { current_user, fetchCurrentUser } = useContext(UserContext); // Access user details
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  // Fetch user details on mount
  useEffect(() => {
    if (!current_user) {
      fetchCurrentUser(); // Ensure user data is loaded
    } else {
      setUserData({
        first_name: current_user.first_name || "",
        last_name: current_user.last_name || "",
        username: current_user.username || "",
        password: "",
      });
    }
  }, [current_user, fetchCurrentUser]);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle Edit
  const handleEdit = () => {
    setEditing(true);
  };

  // Handle Delete
  const handleDelete = () => {
    setUserData({
      first_name: "",
      last_name: "",
      username: "",
      password: "",
    });
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
        <h3 className="mt-3">{current_user?.first_name} {current_user?.last_name}</h3>
        <p>{current_user?.bio || "Welcome to my profile!"}</p>
      </div>

      {/* Personal Details Section */}
      <div className="card mt-4 p-3 shadow-sm border-0 rounded">
        <h4 className="mb-3 fw-semibold">Personal Details</h4>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={userData.first_name}
                      onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
                    />
                  ) : (
                    userData.first_name
                  )}
                </td>
                <td>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={userData.last_name}
                      onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
                    />
                  ) : (
                    userData.last_name
                  )}
                </td>
                <td>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={userData.username}
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    />
                  ) : (
                    userData.username
                  )}
                </td>
                <td>
                  {editing ? (
                    <input
                      type="password"
                      className="form-control"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                  ) : (
                    "••••••"
                  )}
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={handleEdit}>
                    <FiEdit />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
                    <FiTrash />
                  </button>
                </td>
              </tr>
              {!userData.first_name && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No personal details found</td>
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
