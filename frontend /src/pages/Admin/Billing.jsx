import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from 'react-icons/fa';  // Import icons

export default function Billing() {
    const { billings, fetchBillings, updateBilling, deleteBilling } = useContext(AdminContext);
    const [searchTerm, setSearchTerm] = useState("");

    // State for edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: null,
        total_amount: "",
        due_date: "",
        payment_date: "",
        payment_status: "",
        work_order_id: ""
    });

    // State for delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [billingToDelete, setBillingToDelete] = useState(null);

    useEffect(() => {
        fetchBillings();
    }, []);

    const filteredBillings = billings.filter((bill) =>
        bill.id.toString().includes(searchTerm) ||
        bill.vehicle_plate?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit functionality
    const handleEditClick = (bill) => {
        setEditFormData({
            id: bill.id,
            total_amount: bill.total_amount || "",
            due_date: bill.due_date ? bill.due_date.split('T')[0] : "", 
            payment_date: bill.payment_date ? bill.payment_date.split('T')[0] : "",
            payment_status: bill.payment_status || "",
            work_order_id: bill.work_order_id || ""
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        await updateBilling(editFormData.id, editFormData);
        setShowEditModal(false);
    };

    // Delete Confirmation
    const handleDeleteConfirm = (bill) => {
        setBillingToDelete(bill);
        setShowDeleteModal(true);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setBillingToDelete(null);
    };

    const handleDelete = async () => {
        await deleteBilling(billingToDelete.id);
        setShowDeleteModal(false);
        setBillingToDelete(null);
    };

    return (
        <div className="container-fluid mt-4">
            <h2 className="mb-4">Billing</h2>

            {/* Search Panel */}
            <div className="d-flex justify-content-between">
                <div className="input-group w-50">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Invoice..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                        Search
                    </button>
                </div>
            </div>

            {/* Bill Management Table */}
            <div className="card mt-4 shadow-sm">
                <div className="card-header bg-light border-0">
                    <h4 className="mb-0">Bill Management</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="bg-light">
                                <tr>
                                    <th>Invoice #</th>
                                    <th>Work Order Number</th>
                                    <th>Due Date</th>
                                    <th>Payment Date</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>  {/* Add Actions column */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBillings.length > 0 ? (
                                    filteredBillings.map((bill) => (
                                        <tr key={bill.id}>
                                            <td>#Inv-{bill.id}</td>
                                            <td>#WO-{bill.work_order_id}</td>
                                            <td>{bill.due_date ? bill.due_date.split('T')[0] : ''}</td>
                                            <td>{bill.payment_date ? bill.payment_date.split('T')[0] : ''}</td>
                                            <td>Ksh {bill.total_amount?.toLocaleString() || "0"}</td>
                                            <td>
                                                <span className={`badge ${bill.payment_status?.toLowerCase() === "paid"
                                                        ? "bg-success"
                                                        : "bg-warning text-dark"
                                                    }`}>
                                                    {bill.payment_status ? bill.payment_status.toUpperCase() : "Pending"}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-primary me-2"
                                                    onClick={() => handleEditClick(bill)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteConfirm(bill)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No billing records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row justify-content-evenly mt-4">
                {/* Pending Payments */}
                <div className="col-lg-4 col-md-5 col-sm-12 mb-3">
                    <div className="card text-white bg-danger shadow-sm">
                        <div className="card-body text-center">
                            <h5 className="card-title">Pending Payments</h5>
                            <p className="card-text display-6 fw-bold">
                                Ksh {billings.filter(b => b.payment_status !== "Paid").reduce((sum, b) => sum + (b.total_amount || 0), 0).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Total Payments */}
                <div className="col-lg-4 col-md-5 col-sm-12 mb-3">
                    <div className="card text-white bg-warning shadow-sm">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Payments</h5>
                            <p className="card-text display-6 fw-bold">
                                Ksh {billings.reduce((sum, b) => sum + (b.total_amount || 0), 0).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Billing Modal */}
            {showEditModal && (
                <div className="modal-backdrop show"></div>
            )}
            {showEditModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Billing</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Total Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="total_amount"
                                            value={editFormData.total_amount}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Due Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="due_date"
                                            value={editFormData.due_date}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Payment Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="payment_date"
                                            value={editFormData.payment_date}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Payment Status</label>
                                        <select
                                            className="form-control"
                                            name="payment_status"
                                            value={editFormData.payment_status}
                                            onChange={handleEditChange}
                                            required
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Paid">Paid</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-dark"
                                    >
                                        Update Billing
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-backdrop show"></div>
            )}
            {showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Confirmation</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={handleDeleteCancel}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete billing #{billingToDelete?.id}?
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleDeleteCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
