import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { PartsContext } from '../../context/PartsContext';
import { toast } from 'react-toastify';

export default function Dashboard() {
    const { workOrders, billings,fetchWorkOrders } = useContext(AdminContext); 
    const { parts, loading: partsLoading, error: partsError } = useContext(PartsContext);
    const [pendingPayments, setPendingPayments] = useState(0);
    const [lowStockItemsCount, setLowStockItemsCount] = useState(0);

    useEffect(() => {
        // Calculate pending payments
        if (billings) {
            const pendingAmount = billings
                .filter(b => b.payment_status !== "Paid")
                .reduce((sum, b) => sum + (b.total_amount || 0), 0);
            setPendingPayments(pendingAmount);
        }
    }, [billings]);

    useEffect(() => {
        // Calculate low stock items
        if (!partsLoading && !partsError && parts) {
            const lowStockCount = parts.filter(part => part.quantity <= 5).length;
            setLowStockItemsCount(lowStockCount);
        }
    }, [parts, partsLoading, partsError]);

    // Sort work orders by ID in descending order
    const sortedWorkOrders = [...workOrders].sort((a, b) => b.id - a.id);

    // Handle delete work order
    const handleDeleteWorkOrder = async (workOrderId) => {
        try {
            const response = await fetch(`https://garage-7f3u.onrender.com/work_order/${workOrderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete work order');
            fetchWorkOrders(); // Refresh work orders after deletion
            toast.success('Work order deleted successfully!');
        } catch (error) {
            console.error('Error deleting work order:', error);
            toast.error('Failed to delete work order');
        }
    };

    return (
        <div className="container-fluid" style={{ width: "100%" }}>
            <h2 className="mb-4">Admin Dashboard</h2>

            {/* Stats Cards */}
            <div className="row g-3">
                <div className="col-md-4">
                    <div className="card text-white bg-danger w-100 h-100">
                        <div className="card-body">
                            <h5 className="card-title">Pending Payments</h5>
                            <p className="card-text fs-4">Ksh {pendingPayments.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning w-100 h-100">
                        <div className="card-body">
                            <h5 className="card-title">Low Stock Items</h5>
                            <p className="card-text fs-4">{lowStockItemsCount} Items</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success w-100 h-100">
                        <div className="card-body">
                            <h5 className="card-title">Active Work Orders</h5>
                            <p className="card-text fs-4">{workOrders.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Work Orders Table */}
            <div className="card mt-4">
                <div className="card-body">
                    <h4 className="card-title">Recent Work Orders</h4>
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
                            {sortedWorkOrders.map((workOrder) => (
                                <tr key={workOrder.id}>
                                    <td>{workOrder.id}</td>
                                    <td>{workOrder.number_plate}</td>
                                    <td>{workOrder.description}</td>
                                    <td>{workOrder.technician}</td>
                                    <td>
                                        <span className={`badge ${getStatusClass(workOrder.status)}`}>
                                            {workOrder.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteWorkOrder(workOrder.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Helper function to get the status class
function getStatusClass(status) {
    switch (status?.toLowerCase()) {
        case 'in progress':
            return 'bg-primary';
        case 'completed':
            return 'bg-success';
        case 'pending':
            return 'bg-warning text-dark';
        default:
            return 'bg-secondary';
    }
}