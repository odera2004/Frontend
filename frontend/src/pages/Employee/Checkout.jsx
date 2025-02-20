import React from 'react';

export default function Checkout() {
    return (
        <div style={{ display: "flex" }}>
            <div className="sidebar" style={{ width: "250px", height: "100vh", background: "#343a40", color: "white", padding: "15px" }}>
                {/* Sidebar */}
                <h4>Workshop</h4>
                <div className="dashboard-links" style={{ marginTop: "70px" }}>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}>Work Order</a>
                        </li>
                        <li>
                            <a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}>Task</a>
                        </li>
                        <li>
                            <a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}>Billing</a>
                        </li>
                        <li>
                            <a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}>Checkout</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="content" style={{ marginLeft: "100px", padding: "20px", width: "100%" }}>
                <h1 className="mb-4" style={{ color: '#343a40' }}>Security Checkout</h1>

                {/* Input Section */}
                <div className="mb-4">
                    <label htmlFor="vehicleNumberPlate" className="form-label" style={{ fontWeight: 'bold' }}>Vehicle Number Plate:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="vehicleNumberPlate"
                            placeholder="Enter vehicle number plate"
                        />
                        <button
                            className="btn btn-secondary"
                            type="button"
                            style={{ backgroundColor: '#343a40', borderColor: '#6c757d' }}
                        >
                            Check Out
                        </button>
                    </div>
                </div>

                {/* Recent Checkouts Table */}
                <h2 className="mt-5 mb-3" style={{ color: '#343a40' }}>Recent Checkouts</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead style={{ backgroundColor: '#f8f9fa' }}>
                            <tr>
                                <th scope="col" style={{ fontWeight: 'bold' }}>Guard Name</th>
                                <th scope="col" style={{ fontWeight: 'bold' }}>Vehicle Number Plate</th>
                                <th scope="col" style={{ fontWeight: 'bold' }}>Customer Name</th>
                                <th scope="col" style={{ fontWeight: 'bold' }}>Checkout Time</th>
                            </tr>
                        </thead>
                        <tbody id="checkoutTableBody">
                            {/* Rows will be dynamically populated here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
