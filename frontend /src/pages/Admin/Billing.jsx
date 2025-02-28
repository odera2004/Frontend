import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

export default function Billing() {
  const { billings, fetchBillings } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBillings();
  }, []);

  const filteredBillings = billings.filter((bill) =>
    bill.id.toString().includes(searchTerm) ||
    bill.vehicle_plate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Billing</h2>

      {/* Search Panel */}
      <div className="d-flex justify-content-between">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search Invoice..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>

      {/* Bill Management Table */}
      <div className="card mt-4 shadow-sm">
        <div className="card-header bg-light border-0">
          <h4 className="mb-0">Bill Management</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="bg-light">
                <tr>
                  <th>Invoice #</th>
                  <th>Work Order Number</th>
                  <th>Due Date</th>
                  <th>Payment Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBillings.length > 0 ? (
                  filteredBillings.map((bill) => (
                    <tr key={bill.id}>
                      <td>#Inv-{bill.id}</td>
                      <td>#WO-{bill.work_order_id}</td>
                      <td>{bill.due_date}</td>
                      <td>{bill.payment_date}</td>
                      <td>Ksh {bill.total_amount?.toLocaleString() || "0"}</td>
                      <td>
                        <span className={`badge ${
                          bill.payment_status?.toLowerCase() === "paid"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}>
                          {bill.payment_status ? bill.payment_status.toUpperCase() : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No billing records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row justify-content-evenly mt-4">
        {/* Pending Payments */}
        <div className="col-lg-4 col-md-5 col-sm-12 mb-3">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Pending Payments</h5>
              <p className="card-text display-6 fw-bold">
                Ksh {billings.filter(b => b.payment_status !== "Paid").reduce((sum, b) => sum + (b.total_amount || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Payments */}
        <div className="col-lg-4 col-md-5 col-sm-12 mb-3">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Total Payments</h5>
              <p className="card-text display-6 fw-bold">
                Ksh {billings.reduce((sum, b) => sum + (b.total_amount || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
