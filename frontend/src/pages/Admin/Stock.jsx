import React from "react";

export default function Stock() {
  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Stock Management</h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-between">
        <div className="input-group w-50">
          <input type="text" className="form-control" placeholder="Search Item..." />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>

      {/* Stock Table */}
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-header bg-light border-0">
            <h4 className="mb-0">Stock Overview</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr className="bg-light">
                    <th scope="col" className="py-3">Item Name</th>
                    <th scope="col" className="py-3">Quantity</th>
                    <th scope="col" className="py-3">Price</th>
                    <th scope="col" className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Engine Oil", quantity: 98, price: "Ksh 760", status: "In stock", badge: "success" },
                    { name: "Paint", quantity: 77, price: "Ksh 10700", status: "In stock", badge: "success" },
                    { name: "Hard Wax", quantity: 3, price: "Ksh 8,970", status: "Low stock", badge: "warning text-dark" }
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="py-3">{item.name}</td>
                      <td className="py-3">{item.quantity}</td>
                      <td className="py-3">{item.price}</td>
                      <td className="py-3">
                        <span className={`badge bg-${item.badge}`}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
