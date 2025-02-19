import React from 'react';

export default function Employee() {
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
            <div className="content" style={{ marginLeft: "20px", padding: "30px", width: "calc(100% - 260px)" }}>
                {/* Search and Add Employee Panel */}
                <div className="d-flex justify-content-between">
                    <div className="input-group" style={{ width: "1000px" }}>
                        <input type="text" className="form-control" placeholder="Search Employee..." />
                        <button className="btn btn-outline-secondary" type="button">Search</button>
                    </div>
                    <button className="btn btn-primary">Add Employee</button>
                </div>

                {/* Employee List */}
                <div className="container mt-4">
                    <p className="text-muted">No employees available. Add employees to populate the list.</p>
                </div>
            </div>
        </div>
    );
}