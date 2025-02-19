import React from 'react';

export default function Task() {
    return (
        <div style={{ display: "flex" }}><div className="sidebar" style={{ width: "250px",height: "100vh",background: "#343a40",color: "white",padding: "15px" }}>
            {/* Side bar */}
            <h4>Workshop</h4>
            <div className="dashboard-links" style={{ marginTop: "70px" }}>
                <ul className="list-unstyled">
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
            <div className="content" style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
                <h1>Welcome to the Dashboard</h1>
                <p>This is the main content area.</p>
            </div>
        </div>
    );
}
