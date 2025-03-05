import { useState, useContext, useEffect } from "react";
import { FiUpload, FiSun, FiMoon, FiEdit, FiTrash } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../../context/UserContext"; // Import UserContext
import { toast } from "react-toastify";

const Profile = () => {
  const { current_user, fetchCurrentUser, updateUser, deleteUser } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch user details on mount
  useEffect(() => {
    if (!current_user) {
      fetchCurrentUser();
    } else {
      setUserData({
        first_name: current_user.first_name || "",
        last_name: current_user.last_name || "",
        email: current_user.email || "",
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
    if (editing) {
      // Validate password confirmation
      if (userData.password && userData.password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      // Prepare the data to be sent to the backend
      const updatedData = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      };

      // Only include the password if it has been changed
      if (userData.password) {
        updatedData.password = userData.password;
      }

      // Call the updateUser function
      updateUser(current_user.id, updatedData)
        .then(() => {
          toast.success("Profile updated successfully! 🎉");
          setEditing(false); // Exit edit mode
          setConfirmPassword(""); // Clear the confirm password field
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update profile ❌");
        });
    } else {
      // Enter edit mode
      setEditing(true);
    }
  };

  // Handle Delete
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteUser(current_user.id);
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
                <th>Email</th>
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
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  ) : (
                    userData.email
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
              {editing && (
                <tr>
                  <td colSpan="4">
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
              )}
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