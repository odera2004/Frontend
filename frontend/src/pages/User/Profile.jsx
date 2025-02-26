import { useState } from "react";
import { FiEdit, FiUpload, FiPlus, FiSearch, FiSun, FiMoon } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [username, setUsername] = useState("Hafsa_Garage");
  const [bio, setBio] = useState("Car enthusiast | Always keeping my ride fresh 🚗");
  const [profileImage, setProfileImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [services, setServices] = useState([
    { type: "Oil Change", date: "2025-02-15", mechanic: "Eugine", cost: "$50", status: "Completed" },
    { type: "Brake Replacement", date: "2025-02-20", mechanic: "Mary", cost: "$120", status: "Pending" },
  ]);
  const [newService, setNewService] = useState({ type: "", date: "", mechanic: "", cost: "", status: "Pending" });
  const [search, setSearch] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddService = () => {
    if (newService.type && newService.date) {
      setServices([...services, newService]);
      setNewService({ type: "", date: "", mechanic: "", cost: "", status: "Pending" });
    }
  };

  return (
    <div className={`container py-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <button className="btn btn-outline-secondary mb-3" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="card p-4 text-center">
        <div className="position-relative mx-auto" style={{ width: "120px" }}>
          <img
            src={profileImage || "https://via.placeholder.com/120"}
            alt="Profile"
            className="rounded-circle w-100 border border-primary"
          />
          <label className="btn btn-sm btn-outline-primary mt-2" htmlFor="imageUpload">
            <FiUpload /> Upload
          </label>
          <input type="file" id="imageUpload" className="d-none" onChange={handleImageUpload} accept="image/*" />
        </div>
        <h3 className="mt-3">
          <input
            type="text"
            className="form-control text-center"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </h3>
        <p>
          <input
            type="text"
            className="form-control text-center"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </p>
      </div>

      <div className="card mt-4 p-3">
        <h4 className="mb-3">Service History</h4>
        <div className="input-group mb-3">
          <span className="input-group-text"><FiSearch /></span>
          <input type="text" className="form-control" placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <table className="table table-bordered">
          <thead>
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
                <td>{service.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mt-4 p-3">
        <h4 className="mb-3">Add New Service</h4>
        <div className="row g-2">
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Service Type" value={newService.type} onChange={(e) => setNewService({ ...newService, type: e.target.value })} />
          </div>
          <div className="col-md-4">
            <input type="date" className="form-control" value={newService.date} onChange={(e) => setNewService({ ...newService, date: e.target.value })} />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Mechanic Name" value={newService.mechanic} onChange={(e) => setNewService({ ...newService, mechanic: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Cost" value={newService.cost} onChange={(e) => setNewService({ ...newService, cost: e.target.value })} />
          </div>
          <div className="col-md-3">
            <select className="form-control" value={newService.status} onChange={(e) => setNewService({ ...newService, status: e.target.value })}>
              <option>Pending</option>
              <option>In-Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100" onClick={handleAddService}><FiPlus /> Add Service</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
