import React from 'react';

export default function Billing() {
    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <div className="sidebar" style={{ width: "250px", height: "100vh", background: "#343a40", color: "white", padding: "15px" }}>
                <h4>Workshop</h4>
                <div className="dashboard-links" style={{ marginTop: "70px" }}>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}> Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}> Employee</a>
                        </li>
                        <li>
                            <a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}> Billing</a>
                        </li>
                        <li>
                            <a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}> Stock</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="content" style={{ marginLeft: "20px", padding: "30px", width: "calc(100% - 260px)" }}>
                {/* Search Panel */}
                <div className="d-flex justify-content-between ">
                    <div className="input-group" style={{ width: "1000px" }}>
                        <input type="text" className="form-control" placeholder="Search Invoice..." />
                        <button className="btn btn-outline-secondary" type="button">Search </button>
                    </div>
                </div>
                {/* Billing Table */}
                <div className="container mt-5">
                    <div className="card shadow-sm" style={{ width: "107%", margin: "0 auto" }}>
                        <div className="card-header bg-light border-0">
                            <h4 className="mb-100">Bill Management</h4>
                        </div>
                        <div className="card-body">
                            <p className="text-muted text-center">No billing data available</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
