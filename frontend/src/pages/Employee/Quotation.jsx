import React from 'react';

export default function Quotation() {
    return (
        <div style={{ display: "flex" }}>
            <div className="sidebar" style={{ width: "250px", height: "100vh", background: "#343a40", color: "white", padding: "15px" }}>
                {/* Side bar */}
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
            <div className="content" style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
                <h1>Generate Invoice</h1>

                {/* Invoice Form */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="vehiclePlate" className="form-label">Vehicle Plate:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="vehiclePlate"
                            placeholder="Enter vehicle plate number"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label">Customer Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerName"
                            placeholder="Enter customer name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="partsUsed" className="form-label">Parts Used:</label>
                        <textarea
                            className="form-control"
                            id="partsUsed"
                            rows="2"
                            placeholder="List parts used"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="technicianName" className="form-label">Technician Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="technicianName"
                            placeholder="Enter technician name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="totalCost" className="form-label">Total Cost:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="totalCost"
                            placeholder="Enter total cost"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-secondary">Generate Invoice</button>
                </form>

                {/* Recent Billings Table */}
                <h2 className="mt-5">Recent Billings</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead style={{ backgroundColor: '#f8f9fa' }}>
                            <tr>
                                <th scope="col">Vehicle Plate</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Parts Used</th>
                                <th scope="col">Technician Name</th>
                                <th scope="col">Total Cost</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody id="billingTableBody">
                            {/* Rows will be dynamically populated here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
