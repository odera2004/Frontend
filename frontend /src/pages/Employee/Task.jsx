import React, { useEffect, useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';

export default function Task() {
    const { workOrders, fetchWorkOrders, technicianId } = useContext(AdminContext);
    const { current_user } = useContext(UserContext);
    const [selectedWorkOrder, setSelectedWorkOrder] = useState(null); 
    const [showEditModal, setShowEditModal] = useState(false); 
    const [status, setStatus] = useState(''); 

    useEffect(() => {
        fetchWorkOrders(); 
    }, [fetchWorkOrders]);

    // Filter work orders that are either pending or in progress
    const pendingAndInProgressWorkOrders = workOrders.filter(order =>
        order.status.toLowerCase() === "pending" || order.status.toLowerCase() === "in progress"
    );

    // Filter work orders assigned to the current technician
    const workOrdersAssignedToMe = pendingAndInProgressWorkOrders.filter(order =>
        order.technician_id === technicianId
    );

    // Handle edit button click
    const handleEditClick = (workOrder) => {
        setSelectedWorkOrder(workOrder);
        setStatus(workOrder.status); 
        setShowEditModal(true); 
    };

    // Handle status update
    const handleStatusUpdate = async () => {
        if (!selectedWorkOrder) return;

        try {
            const response = await fetch(`https://garage-7f3u.onrender.com/work_orders/${selectedWorkOrder.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${current_user.authToken}`
                },
                body: JSON.stringify({ status })
            });

            if (!response.ok) throw new Error('Failed to update work order status');
            fetchWorkOrders(); 
            setShowEditModal(false); 
            toast.success('Work order status updated successfully!');
        } catch (error) {
            console.error('Error updating work order status:', error);
            toast.error('Failed to update work order status');
        }
    };

    return (
        <div className="container-fluid" style={{ width: "100%" }}>
            <h2 className="mb-4">Pending and In Progress Work Orders</h2>

            {/* Tabs for switching between views */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#allPendingAndInProgress" data-bs-toggle="tab">
                        All Pending and In Progress
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#assignedToMe" data-bs-toggle="tab">
                        Assigned to Me
                    </a>
                </li>
            </ul>

            {/* Tab content */}
            <div className="tab-content">
                <div className="tab-pane fade show active" id="allPendingAndInProgress">
                    {/* All Pending and In Progress Work Orders Table */}
                    <div className="card mt-4">
                        <div className="card-body">
                            <h4 className="card-title">All Pending and In Progress Work Orders</h4>
                            <table className="table table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th>Work Order ID</th>
                                        <th>Vehicle</th>
                                        <th>Description</th>
                                        <th>Technician</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingAndInProgressWorkOrders.length > 0 ? (
                                        pendingAndInProgressWorkOrders.map((workOrder) => (
                                            <tr key={workOrder.id}>
                                                <td>{workOrder.id}</td>
                                                <td>{workOrder.number_plate}</td>
                                                <td>{workOrder.description}</td>
                                                <td>{workOrder.technician}</td>
                                                <td>{workOrder.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted">
                                                No pending or in progress work orders
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="assignedToMe">
                    {/* Work Orders Assigned to Current Technician Table */}
                    <div className="card mt-4">
                        <div className="card-body">
                            <h4 className="card-title">Work Orders Assigned to Me</h4>
                            <table className="table table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th>Work Order ID</th>
                                        <th>Vehicle</th>
                                        <th>Description</th>
                                        <th>Technician</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workOrdersAssignedToMe.length > 0 ? (
                                        workOrdersAssignedToMe.map((workOrder) => (
                                            <tr key={workOrder.id}>
                                                <td>{workOrder.id}</td>
                                                <td>{workOrder.number_plate}</td>
                                                <td>{workOrder.description}</td>
                                                <td>{workOrder.technician}</td>
                                                <td>{workOrder.status}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => handleEditClick(workOrder)}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted">
                                                No work orders assigned to you
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Work Order Status</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleStatusUpdate}
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}