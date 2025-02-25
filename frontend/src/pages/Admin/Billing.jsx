import React from "react";

export default function Billing() {
  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Billing</h2>

      {/* Search and Add Employee Panel */}
      <div className="d-flex justify-content-between">
        <div className="input-group w-50">
          <input type="text" className="form-control" placeholder="Search Invoice..." />
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
                  <th>Vehicle Plate</th>
                  <th>Technician</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#Inv-2023-001</td>
                  <td>#WO-2023-001</td>
                  <td>KDB 409N</td>
                  <td>John Smith</td>
                  <td>Ksh 80,908</td>
                  <td>
                    <span className="badge bg-success">PAID</span>
                  </td>
                </tr>
                <tr>
                  <td>#Inv-2023-003</td>
                  <td>#WO-2023-002</td>
                  <td>KAG 409N</td>
                  <td>Bobby Shmurda</td>
                  <td>Ksh 478,908</td>
                  <td>
                    <span className="badge bg-warning text-dark">UNPAID</span>
                  </td>
                </tr>
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
              <p className="card-text display-6 fw-bold">Ksh 60,000</p>
            </div>
          </div>
        </div>

        {/* Total Payments */}
        <div className="col-lg-4 col-md-5 col-sm-12 mb-3">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Total Payments</h5>
              <p className="card-text display-6 fw-bold">Ksh 769,900</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
