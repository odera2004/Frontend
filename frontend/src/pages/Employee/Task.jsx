import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

export default function Task() {
  const { workOrders, fetchWorkOrders } = useContext(AdminContext);

  useEffect(() => {
    fetchWorkOrders(); // Fetch all work orders
  }, [fetchWorkOrders]);

  // Filter only pending work orders
  const pendingWorkOrders = workOrders.filter(order => order.status.toLowerCase() === "pending");

  return (
    <div className="container-fluid" style={{ width: "100%" }}>
      <h2 className="mb-4">Pending Work Orders</h2>

      {/* Pending Work Orders Table */}
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Pending Work Orders</h4>
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
              {pendingWorkOrders.length > 0 ? (
                pendingWorkOrders.map((workOrder) => (
                  <tr key={workOrder.id}>
                    <td>{workOrder.id}</td>
                    <td>{workOrder.vehicle_number_plate}</td>
                    <td>{workOrder.description}</td>
                    <td>{workOrder.technician}</td>
                    <td>{workOrder.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No pending work orders
                  </td>
                </tr>
              )}
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
