import React from "react";

export default function Employee() {
  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Employee Management</h2>

      {/* Search and Add Employee Panel */}
      <div className="d-flex justify-content-between">
        <div className="input-group w-50">
          <input type="text" className="form-control" placeholder="Search Employee..." />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
        <button className="btn btn-primary">Add Employee</button>
      </div>

      {/* Employee List */}
      <div className="container mt-4">
        {[
          { name: "John Doe", email: "john@example.com", contact: "123-456-7890", role: "Technician", specialty: "Engine Repairs" },
          { name: "Jane Smith", email: "jane@example.com", contact: "987-654-3210", role: "Admin", specialty: "HR Management" },
          { name: "Mike Johnson", email: "mike@example.com", contact: "555-666-7777", role: "Guard", specialty: "Security Monitoring" }
        ].map((employee, index) => (
          <div key={index} className="card shadow-sm mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div style={{ flex: "1" }}>
                <h5 className="card-title">{employee.name}</h5>
                <div className="row">
                  <div className="col-md-3">
                    <p className="mb-1"><strong>Email:</strong> {employee.email}</p>
                  </div>
                  <div className="col-md-3">
                    <p className="mb-1"><strong>Contact:</strong> {employee.contact}</p>
                  </div>
                  <div className="col-md-3">
                    <p className="mb-1"><strong>Role:</strong> {employee.role}</p>
                  </div>
                  <div className="col-md-3">
                    <p className="mb-1"><strong>Specialty:</strong> {employee.specialty}</p>
                  </div>
                </div>
              </div>
              <button className="btn btn-sm btn-outline-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
