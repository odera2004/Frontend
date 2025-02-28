import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

export default function Dashboard() {
  const { workOrders, fetchWorkOrders } = useContext(AdminContext);

  useEffect(() => {
    fetchWorkOrders(); // Fetch work orders when the component mounts
  }, [fetchWorkOrders]);

  return (
    <div className="container-fluid" style={{ width: "100%" }}>
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card text-white bg-danger w-100 h-100">
            <div className="card-body">
              <h5 className="card-title">Pending Payments</h5>
              <p className="card-text fs-4">Ksh 15,000</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning w-100 h-100">
            <div className="card-body">
              <h5 className="card-title">Low Stock Items</h5>
              <p className="card-text fs-4">2 Items</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success w-100 h-100">
            <div className="card-body">
              <h5 className="card-title">Active Work Orders</h5>
              <p className="card-text fs-4">{workOrders.length}</p>
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
                <th>Work Order ID</th>
                <th>Vehicle</th>
                <th>Description</th>
                <th>Technician</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((workOrder) => (
                <tr key={workOrder.id}>
                  <td>{workOrder.id}</td>
                  <td>{workOrder.vehicle_number_plate}</td> {/* ✅ Fetching actual vehicle number plate */}
                  <td>{workOrder.description}</td>
                  <td>{workOrder.technician}</td> {/* ✅ Fetching actual technician name */}
                  <td>
                    <span className={`badge ${getStatusClass(workOrder.status)}`}>{workOrder.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Helper function to get the status class
function getStatusClass(status) {
  switch (status?.toLowerCase()) {
    case 'in progress':
      return 'bg-primary';
    case 'completed':
      return 'bg-success';
    case 'pending':
      return 'bg-warning text-dark';
    default:
      return 'bg-secondary';
  }
}
