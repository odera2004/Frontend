import React from 'react';

export default function Task() {
    return (
        <div className="content" style={{ padding: "20px", width: "100%" }}>
            <h1 className="mb-4" style={{ color: '#343a40' }}>Pending Work Orders</h1>

            <div className="container mt-5">
                <div className="card shadow-sm">
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
