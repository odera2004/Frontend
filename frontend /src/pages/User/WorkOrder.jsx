import React, { useContext } from 'react';
import { WorkOrderContext } from '../../context/WorkOrderContext';

export default function WorkOrders() {
  const { activeWorkOrders, previousWorkOrders, loading } = useContext(WorkOrderContext);

  if (loading) {
    return <div>Loading...</div>;
  }

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
                    {activeWorkOrders.length > 0 ? (
                      activeWorkOrders.map((order) => (
                        <tr key={order.id}>
                          <td>#WO -{order.id}</td>
                          <td>{order.number_plate}</td>
                          <td>{order.description}</td>
                          <td>{order.technician}</td>
                          <td>
                          <span
                          className={`badge ${order.status === "in progress"
                            ? "bg-warning text-dark"  
                            : order.status === "Pending"
                              ? "bg-info text-dark" 
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
                    {previousWorkOrders.length > 0 ? (
                      previousWorkOrders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.number_plate}</td>
                          <td>{order.description}</td>
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