import React, { useState } from "react";

function WorkOrders() {
  const [activeOrders, setActiveOrders] = useState([
    { id: 1, orderRef: "WO-001", vehicle: "Toyota Corolla", issue: "Engine overheating", technician: "John Doe", status: "In Progress" },
    { id: 2, orderRef: "WO-002", vehicle: "Honda Civic", issue: "Brake failure", technician: "Jane Smith", status: "Assigned" }
  ]);

  const [previousOrders, setPreviousOrders] = useState([
    { id: 3, orderRef: "WO-003", vehicle: "Ford Focus", issue: "Oil change", technician: "Mike Johnson", status: "Completed" },
    { id: 4, orderRef: "WO-004", vehicle: "BMW X5", issue: "Battery replacement", technician: "Emily Davis", status: "Completed" }
  ]);

  return (
    <div className="container mt-5">
      {/* Active Work Orders */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white border-0">
          <h4 className="mb-0">Active Work Orders</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr className="bg-light">
                  <th scope="col">Order Ref</th>
                  <th scope="col">Vehicle</th>
                  <th scope="col">Issue</th>
                  <th scope="col">Technician</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeOrders.length > 0 ? (
                  activeOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.orderRef}</td>
                      <td>{order.vehicle}</td>
                      <td>{order.issue}</td>
                      <td>{order.technician}</td>
                      <td>
                        <span className={`badge ${order.status === "In Progress" ? "bg-warning text-dark" : "bg-secondary"}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No active work orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Previous Work Orders */}
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white border-0">
          <h4 className="mb-0">Previous Work Orders</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr className="bg-light">
                  <th scope="col">Order Ref</th>
                  <th scope="col">Vehicle</th>
                  <th scope="col">Issue</th>
                  <th scope="col">Technician</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {previousOrders.length > 0 ? (
                  previousOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.orderRef}</td>
                      <td>{order.vehicle}</td>
                      <td>{order.issue}</td>
                      <td>{order.technician}</td>
                      <td>
                        <span className="badge bg-success">{order.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No previous work orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkOrders;
