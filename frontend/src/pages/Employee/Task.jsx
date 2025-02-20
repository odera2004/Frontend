import React from 'react';

export default function Task() {
    return (
        <div style={{ display: "flex" }}><div className="sidebar" style={{ width: "250px",height: "100vh",background: "#343a40",color: "white",padding: "15px" }}>
            {/* Side bar */}
            <h4>Workshop</h4>
            <div className="dashboard-links" style={{ marginTop: "70px" }}>
                <ul className="list-unstyled">
                    <li>
                        <a href="#" className="text-white d-block py-2" style = {{textDecoration: "None"}}>Work Order</a>
                    </li>
                    <li>
                        <a href="#" className="text-white d-block py-2" style = {{textDecoration: "None"}}>Task</a>
                    </li>
                    <li>
                        <a href="#" className="text-white d-block py-2" style = {{textDecoration: "None"}}> Billing</a>
                    </li>
                    <li>
                        <a href="#" className="text-white d-block py-2" style = {{textDecoration: "None"}}> Checkout</a>
                    </li>
                </ul>
            </div>
        </div>


            {/* Main Content */}
            <div className="content" style={{ marginLeft: "80px", padding: "20px", width: "calc(100% - 260px)" }}></div>
                {/* Work Orders Table */}
                <div className="container mt-5">
                    <div className="card shadow-sm" style={{ width: "230%", margin: "0 " }}>
                        <div className="card-header bg-light border-0">
                            <h4 className="mb-100">Pending Work Orders</h4>
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
    );
}
