import React from 'react';

export default function WorkOrder() {
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
            <div className="content" style={{ marginLeft: "150px", padding: "30px", width: "calc(100% - 260px)" }}>
                <div className="card shadow-sm" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <div className="card-header bg-white border-0 py-3">
                        <h3 className="mb-0">Create Work Order</h3>
                    </div>
                    <div className="card-body">
                        <form className="needs-validation">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="customerName" className="form-label fw-semibold">Customer Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg shadow-sm" 
                                            id="customerName" 
                                            placeholder="Enter customer name"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="vehicleNumberPlate" className="form-label fw-semibold">Vehicle Number Plate</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg shadow-sm" 
                                            id="vehicleNumberPlate" 
                                            placeholder="Enter vehicle number plate"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="issueDescription" className="form-label fw-semibold">Issue Description</label>
                                        <textarea 
                                            className="form-control form-control-lg shadow-sm" 
                                            id="issueDescription" 
                                            rows="4" 
                                            placeholder="Describe the issue in detail..."
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="technicianName" className="form-label fw-semibold">Technician Name</label>
                                        <select className="form-select form-select-lg shadow-sm" id="technicianName" required>
                                            <option value="">Select Technician</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="guardName" className="form-label fw-semibold">Guard Name</label>
                                        <select className="form-select form-select-lg shadow-sm" id="guardName" required>
                                            <option value="">Select Guard</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="completionTime" className="form-label fw-semibold">Estimated Completion Time</label>
                                        <input 
                                            type="datetime-local" 
                                            className="form-control form-control-lg shadow-sm" 
                                            id="completionTime" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-lg btn-dark w-100 shadow-sm">
                                        Submit Work Order
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}