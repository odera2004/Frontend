import React, { useState } from "react";

function WorkOrders() {
  const [activeOrders, setActiveOrders] = useState([
    { id: 1, orderRef: "WO-001", vehicle: "Toyota Corolla", issue: "Engine overheating", technician: "Hafsa Abdy", status: "In Progress" },
    { id: 2, orderRef: "WO-002", vehicle: "Honda Civic", issue: "Brake failure", technician: "Jared Smith", status: "Assigned" },
    { id: 3, orderRef: "WO-005", vehicle: "Chevrolet Malibu", issue: "Transmission issue", technician: "Alex Roe", status: "In Progress" },
    { id: 4, orderRef: "WO-006", vehicle: "Mazda 3", issue: "Suspension repair", technician: "Emma Lee", status: "Assigned" }
  ]);

  const [previousOrders, setPreviousOrders] = useState([
    { id: 5, orderRef: "WO-003", vehicle: "Ford Focus", issue: "Oil change", technician: "Douyin", status: "Completed" },
    { id: 6, orderRef: "WO-004", vehicle: "BMW X5", issue: "Battery replacement", technician: "Sunghoon", status: "Completed" },
    { id: 7, orderRef: "WO-007", vehicle: "Hyundai Elantra", issue: "Tire replacement", technician: "Jayden Kim", status: "Completed" },
    { id: 8, orderRef: "WO-008", vehicle: "Nissan Altima", issue: "Brake inspection", technician: "Sara Wong", status: "Completed" }
  ]);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Active Work Orders Section */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-4" style={{ minHeight: "400px" }}>
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
                            <span
                              className={`badge ${
                                order.status === "In Progress"
                                  ? "bg-warning text-dark"
                                  : "bg-secondary"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          No active work orders
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Work Orders Section */}
        <div className="col-md-6">
          <div className="card shadow-sm" style={{ minHeight: "400px" }}>
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
                            <span className="badge bg-success">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          No previous work orders
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkOrders;