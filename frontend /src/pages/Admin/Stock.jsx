import React, { useContext, useState } from "react";
import { PartsContext } from "../../context/PartsContext";
import { FaTrash, FaPen } from 'react-icons/fa';

export default function Stock() {
    const { parts, loading, error, addPart, deletePart, updatePart } = useContext(PartsContext);

    // Modal & Form State
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", quantity: "", price: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [partToDelete, setPartToDelete] = useState(null);

    // State for edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({ id: null, name: "", quantity: "", price: "" });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.quantity || !formData.price) return;

        await addPart(formData); 
        setShowModal(false);
        setFormData({ name: "", quantity: "", price: "" }); 
    };

    // Handle search filtering
    const filteredParts = parts.filter((part) =>
        part.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle delete confirmation
    const handleDeleteConfirm = (part) => {
        setPartToDelete(part);
        setConfirmDelete(true);
    };

    const handleDeleteCancel = () => {
        setConfirmDelete(false);
        setPartToDelete(null);
    };

    const handleDelete = async () => {
        if (partToDelete) {
            await deletePart(partToDelete.id);
            setConfirmDelete(false);
            setPartToDelete(null);
        }
    };

    // Handle edit functionality
    const handleEditClick = (part) => {
        setEditFormData({ id: part.id, name: part.name, quantity: part.quantity, price: part.price });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editFormData.name || !editFormData.quantity || !editFormData.price) return;

        await updatePart(editFormData.id, editFormData);
        setShowEditModal(false);
        setEditFormData({ id: null, name: "", quantity: "", price: "" });
    };

    if (loading) return <p>Loading stock data...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container-fluid mt-4">
            {/* Header with Search and Add Part button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="input-group w-50">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Item..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary">Search</button>
                </div>
                <button
                    className="btn btn-dark"
                    onClick={() => setShowModal(true)}
                    style={{ backgroundColor: "#333", borderColor: "#333" }}
                >
                    + Add Part
                </button>
            </div>

            {/* Stock Table */}
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-light border-0">
                        <h4 className="mb-0">Stock Overview</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr className="bg-light">
                                        <th scope="col" className="py-3">Item Name</th>
                                        <th scope="col" className="py-3">Quantity</th>
                                        <th scope="col" className="py-3">Price (Ksh)</th>
                                        <th scope="col" className="py-3">Status</th>
                                        <th scope="col" className="py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredParts.length > 0 ? (
                                        filteredParts.map((part) => (
                                            <tr key={part.id}>
                                                <td className="py-3">{part.name}</td>
                                                <td className="py-3">{part.quantity}</td>
                                                <td className="py-3">Ksh {part.price.toLocaleString()}</td>
                                                <td className="py-3">
                                                    <span
                                                        className={`badge ${part.quantity === 0
                                                            ? "bg-danger"
                                                            : part.quantity <= 5
                                                                ? "bg-warning text-dark"
                                                                : "bg-success"
                                                            }`}
                                                    >
                                                        {part.quantity === 0
                                                            ? "Out of stock"
                                                            : part.quantity <= 5
                                                                ? "Low stock"
                                                                : "In stock"}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <button
                                                        className="btn btn-sm btn-primary me-2"
                                                        onClick={() => handleEditClick(part)}
                                                    >
                                                        <FaPen />
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDeleteConfirm(part)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-3">
                                                No stock available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Part Modal */}
            {showModal && (
                <div className="modal-backdrop show"></div>
            )}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Part</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Item Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Price (Ksh)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-dark"
                                        style={{ backgroundColor: "#333", borderColor: "#333" }}
                                    >
                                        Add Part
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="modal-backdrop show"></div>
            )}
            {confirmDelete && (
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
                                Are you sure you want to delete {partToDelete?.name}?
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

            {/* Edit Part Modal */}
            {showEditModal && (
                <div className="modal-backdrop show"></div>
            )}
            {showEditModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Part</h5>
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
                                        <label className="form-label">Item Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="quantity"
                                            value={editFormData.quantity}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Price (Ksh)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={editFormData.price}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-dark"
                                        style={{ backgroundColor: "#333", borderColor: "#333" }}
                                    >
                                        Update Part
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}