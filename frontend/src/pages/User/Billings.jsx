import React, { useState } from "react";

function Billings() {  
  const [pendingBilling, setPendingBilling] = useState([
    { id: 1, invoice: "INV-001", amount: "$200", dueDate: "2025-03-10", status: "Pending" },
    { id: 2, invoice: "INV-002", amount: "$450", dueDate: "2025-03-15", status: "Pending" }
  ]);

  const [previousBilling, setPreviousBilling] = useState([
    { id: 3, invoice: "INV-003", amount: "$150", dueDate: "2025-02-01", status: "Paid" },
    { id: 4, invoice: "INV-004", amount: "$300", dueDate: "2025-02-05", status: "Paid" }
  ]);

  return (
    <div className="container mt-5 w-100 mx-auto">
      <h2 className="text-center mb-4 text-uppercase fw-bold">Billing</h2>

      {/* Pending Billing */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0 text-uppercase">Pending Billing</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="bg-light text-center">
                  <th scope="col" className="py-3">Invoice No</th>
                  <th scope="col" className="py-3">Amount</th>
                  <th scope="col" className="py-3">Due Date</th>
                  <th scope="col" className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingBilling.length > 0 ? (
                  pendingBilling.map((bill) => (
                    <tr key={bill.id} className="text-center">
                      <td className="py-4">{bill.invoice}</td>
                      <td className="py-4">{bill.amount}</td>
                      <td className="py-4">{bill.dueDate}</td>
                      <td className="py-4">
                        <span className="badge bg-warning text-dark">{bill.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No pending bills</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Previous Billing */}
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white text-center">
          <h4 className="mb-0 text-uppercase">Previous Billing</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="bg-light text-center">
                  <th scope="col" className="py-3">Invoice No</th>
                  <th scope="col" className="py-3">Amount</th>
                  <th scope="col" className="py-3">Due Date</th>
                  <th scope="col" className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {previousBilling.length > 0 ? (
                  previousBilling.map((bill) => (
                    <tr key={bill.id} className="text-center">
                      <td className="py-4">{bill.invoice}</td>
                      <td className="py-4">{bill.amount}</td>
                      <td className="py-4">{bill.dueDate}</td>
                      <td className="py-4">
                        <span className="badge bg-success">{bill.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No previous bills</td>
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

export default Billings;  