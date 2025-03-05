import React, { useContext } from 'react';
import { BillingContext } from '../../context/BillingContext';
import "bootstrap-icons/font/bootstrap-icons.min.css";


function Billings() {
  const { pendingBillings, previousBillings, loading } = useContext(BillingContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 w-100 mx-auto" style={{ 
      backgroundImage: "url('https://source.unsplash.com/1600x900/?finance,office')", 
      backgroundSize: "cover", 
      backgroundPosition: "center", 
      padding: "20px", 
      borderRadius: "10px"
    }}>
      <h2 className="text-center mb-4 text-uppercase fw-bold">Billing</h2>

      <div className="row">
        {/* Pending Billing */}
        <div className="col-md-6">
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-header bg-warning text-dark text-center">
              <h4 className="mb-0 text-uppercase"><i className="bi bi-clock-history me-2"></i>Pending Billing</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>Invoice No</th>
                      <th>Work Order No</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingBillings.length > 0 ? (
                      pendingBillings.map((bill) => (
                        <tr key={bill.id} className="text-center">
                          <td>INV-{bill.id}</td>
                          <td>WO-{bill.work_order_id}</td>
                          <td>Ksh {bill.total_amount}</td>
                          <td>{new Date(bill.due_date).toLocaleDateString()}</td>
                          <td>
                            <span className="badge bg-warning text-dark">{bill.payment_status}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No pending bills</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Billing */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-secondary text-white text-center">
              <h4 className="mb-0 text-uppercase"><i className="bi bi-journal-check me-2"></i>Previous Billing</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>Invoice No</th>
                      <th>Work Order No</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousBillings.length > 0 ? (
                      previousBillings.map((bill) => (
                        <tr key={bill.id} className="text-center">
                          <td>INV-{bill.id}</td>
                          <td>WO-{bill.work_order_id}</td>
                          <td>Ksh {bill.total_amount}</td>
                          <td>{new Date(bill.due_date).toLocaleDateString()}</td>
                          <td>
                            <span className={`badge ${bill.payment_status === "Paid" ? "bg-success" : bill.payment_status === "Overdue" ? "bg-danger" : "bg-warning text-dark"}`}>
                              {bill.payment_status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No previous bills</td>
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

export default Billings;
