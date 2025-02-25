import React from "react";

export default function Dashboard() {
  return (
    <div className="container mt-4">
  <h2 className="mb-4">Dashboard</h2>

  {/* Stats Cards */}
  <div className="row">
    <div className="col-md-4">
      <div className="card text-white bg-danger mb-3">
        <div className="card-body">
          <h5 className="card-title">Pending Payments</h5>
          <p className="card-text fs-4">Ksh 60,000</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card text-white bg-warning mb-3">
        <div className="card-body">
          <h5 className="card-title">Low Stock Items</h5>
          <p className="card-text fs-4">12 Items</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card text-white bg-success mb-3">
        <div className="card-body">
          <h5 className="card-title">Active Work Orders</h5>
          <p className="card-text fs-4">8</p>
        </div>
      </div>
    </div>
  </div>

  {/* Work Orders Table */}
  <div className="card mt-4">
    <div className="card-body">
      <h4 className="card-title">Recent Work Orders</h4>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Work</th>
            <th>Vehicle</th>
            <th>Issue</th>
            <th>Technician</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#WO-2023-001</td>
            <td>Volvo FH16</td>
            <td>Engine Overhaul</td>
            <td>John Smith</td>
            <td><span className="badge bg-primary">In Progress</span></td>
          </tr>
          <tr>
            <td>#WO-2023-002</td>
            <td>Scania R500</td>
            <td>Brake Service</td>
            <td>Mike Johnson</td>
            <td><span className="badge bg-success">Completed</span></td>
          </tr>
          <tr>
            <td>#WO-2023-003</td>
            <td>MAN TGX</td>
            <td>Transmission Repair</td>
            <td>David Wilson</td>
            <td><span className="badge bg-warning text-dark">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}
