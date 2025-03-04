import React, { useContext } from 'react';
import { BillingContext } from '../../context/BillingContext';

function Billings() {
  const { pendingBillings, previousBillings, loading } = useContext(BillingContext);

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  <th scope="col" className="py-3">Work Order No</th>
                  <th scope="col" className="py-3">Amount</th>
                  <th scope="col" className="py-3">Due Date</th>
                  <th scope="col" className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingBillings.length > 0 ? (
                  pendingBillings.map((bill) => (
                    <tr key={bill.id} className="text-center">
                      <td className="py-4">INV-{bill.id}</td>
                      <td className="py-4">WO-{bill.work_order_id}</td>
                      <td className="py-4">Ksh {bill.total_amount}</td>
                      <td className="py-4">{new Date(bill.due_date).toLocaleDateString()}</td>
                      <td className="py-4">
                        <span className="badge bg-warning text-dark">{bill.payment_status}</span>
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
                  <th scope="col" className="py-3">Work Order No</th>
                  <th scope="col" className="py-3">Amount</th>
                  <th scope="col" className="py-3">Due Date</th>
                  <th scope="col" className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {previousBillings.length > 0 ? (
                  previousBillings.map((bill) => (
                    <tr key={bill.id} className="text-center">
                      <td className="py-4">INV-{bill.id}</td>
                      <td className="py-4">WO-{bill.work_order_id}</td>
                      <td className="py-4">Ksh {bill.total_amount}</td>
                      <td className="py-4">{new Date(bill.due_date).toLocaleDateString()}</td>
                      <td className="py-4">
                        <span className="badge bg-success">{bill.payment_status}</span>
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