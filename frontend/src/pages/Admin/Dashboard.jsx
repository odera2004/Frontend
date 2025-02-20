import React from 'react';

export default function Dashboard() {
    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <div className="sidebar" style={{ width: "250px", height: "100vh", background: "#343a40", color: "white", padding: "15px" }}>
                <h4>Workshop</h4>
                <div className="dashboard-links" style={{ marginTop: "70px" }}>
                    <ul className="list-unstyled">
                        <li><a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}> Dashboard</a></li>
                        <li><a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}> Employee</a></li>
                        <li><a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}> Billing</a></li>
                        <li><a href="#" className="text-white d-block py-2" style={{ textDecoration: "none" }}> Stock</a></li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="content" style={{ marginLeft: "80px", padding: "20px", width: "calc(100% - 260px)" }}>
                {/* Stats Cards */}
                <div className="container mt-4">
                    <div className="row justify-content-between">
                        <div className="col-lg-3 col-md-5 col-sm-12 mb-3">
                            <div className="card text-white bg-danger shadow-sm" style={{ height: "150px", width: "300px" }}>
                                <div className="card-body text-center d-flex flex-column justify-content-center">
                                    <h5 className="card-title">Pending Payments</h5>
                                    <p className="card-text display-6 fw-bold">-</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-5 col-sm-12 mb-3">
                            <div className="card text-white bg-warning shadow-sm" style={{ height: "150px", width: "300px" }}>
                                <div className="card-body text-center d-flex flex-column justify-content-center">
                                    <h5 className="card-title">Low Stock Items</h5>
                                    <p className="card-text display-6 fw-bold">-</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-5 col-sm-12 mb-3">
                            <div className="card text-white bg-success shadow-sm" style={{ height: "150px", width: "300px" }}>
                                <div className="card-body text-center d-flex flex-column justify-content-center">
                                    <h5 className="card-title">Active Work Orders</h5>
                                    <p className="card-text display-6 fw-bold">-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Work Orders Table */}
                <div className="container mt-5">
                    <div className="card shadow-sm" style={{ width: "107%", margin: "0 auto" }}>
                        <div className="card-header bg-light border-0">
                            <h4 className="mb-100">Recent Work Orders</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="bg-light">
                                            <th scope="col" className="py-3">Order ref</th>
                                            <th scope="col" className="py-3">Vehicle</th>
                                            <th scope="col" className="py-3">Issue</th>
                                            <th scope="col" className="py-3">Technician</th>
                                            <th scope="col" className="py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Work orders will be dynamically populated here */}
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
